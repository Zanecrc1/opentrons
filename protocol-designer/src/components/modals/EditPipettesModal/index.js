// @flow
import type { ElementProps } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import mapValues from 'lodash/mapValues'

import { uuid } from '../../../utils'
import { INITIAL_DECK_SETUP_STEP_ID } from '../../../constants'
import { actions as steplistActions } from '../../../steplist'
import {
  actions as stepFormActions,
  selectors as stepFormSelectors,
} from '../../../step-forms'
import FilePipettesModal from '../FilePipettesModal'
import type { BaseState, ThunkDispatch } from '../../../types'
import type { PipetteOnDeck, FormPipettesByMount } from '../../../step-forms'
import type { StepIdType } from '../../../form-types'

type Props = ElementProps<typeof FilePipettesModal>

type SP = {|
  initialPipetteValues: FormPipettesByMount,
  _prevPipettes: { [pipetteId: string]: PipetteOnDeck },
  _orderedStepIds: Array<StepIdType>,
|}

type OP = {|
  closeModal: () => mixed,
|}

const mapSTP = (state: BaseState): SP => {
  const initialPipettes = stepFormSelectors.getPipettesForEditPipetteForm(state)

  return {
    initialPipetteValues: initialPipettes,
    _prevPipettes: stepFormSelectors.getInitialDeckSetup(state).pipettes, // TODO: Ian 2019-01-02 when multi-step editing is supported, don't use initial deck state. Instead, show the pipettes available for the selected step range
    _orderedStepIds: stepFormSelectors.getOrderedStepIds(state),
  }
}

// NOTE: this function is doing some weird stuff because we are envisioning
// that the following changes will happen, and working to support them cleanly.
// We anticipate that:
// * pipettes will be created/deleted outside of the timeline (like liquids)
// * there will be multiple manualIntervention steps which set/unset pipettes
// on robot mounts on the timeline
// * there will be a facility to substitute pipettes used in steps across a
// selection of multiple steps
//
// Currently, PD's Edit Pipettes functionality is doing several of these steps
// in one click (create, change manualIntervention step, substitute pipettes
// across all steps, delete pipettes), which is why it's so funky!
const makeUpdatePipettes = (
  prevPipettes,
  orderedStepIds,
  dispatch,
  closeModal
) => ({ pipettes: newPipetteArray }) => {
  const prevPipetteIds = Object.keys(prevPipettes)
  let usedPrevPipettes: Array<string> = [] // IDs of pipettes in prevPipettes that were already put into nextPipettes
  let nextPipettes: { [pipetteId: string]: PipetteOnDeck } = {}

  // from array of pipettes from Edit Pipette form (with no IDs),
  // assign IDs and populate nextPipettes
  newPipetteArray.forEach(newPipette => {
    if (newPipette && newPipette.name && newPipette.tiprackModel) {
      const candidatePipetteIds = prevPipetteIds.filter(id => {
        const prevPipette = prevPipettes[id]
        const alreadyUsed = usedPrevPipettes.some(usedId => usedId === id)
        return !alreadyUsed && prevPipette.name === newPipette.name
      })
      const pipetteId: ?string = candidatePipetteIds[0]
      if (pipetteId) {
        // update used pipette list
        usedPrevPipettes.push(pipetteId)
        nextPipettes[pipetteId] = newPipette
      } else {
        nextPipettes[uuid()] = newPipette
      }
    }
  })

  dispatch(
    stepFormActions.createPipettes(
      mapValues(nextPipettes, (p: $Values<typeof nextPipettes>) => ({
        name: p.name,
        tiprackModel: p.tiprackModel,
      }))
    )
  )

  // set/update pipette locations in initial deck setup step
  dispatch(
    steplistActions.changeSavedStepForm({
      stepId: INITIAL_DECK_SETUP_STEP_ID,
      update: {
        pipetteLocationUpdate: mapValues(
          nextPipettes,
          (p: PipetteOnDeck) => p.mount
        ),
      },
    })
  )

  const pipetteIdsToDelete: Array<string> = Object.keys(prevPipettes).filter(
    id => !(id in nextPipettes)
  )
  const substitutionMap = pipetteIdsToDelete.reduce(
    (acc: { [string]: string }, deletedId: string): { [string]: string } => {
      const deletedPipette = prevPipettes[deletedId]
      const replacementId = Object.keys(nextPipettes).find(
        newId => nextPipettes[newId].mount === deletedPipette.mount
      )
      return replacementId && replacementId !== -1
        ? { ...acc, [deletedId]: replacementId }
        : acc
    },
    {}
  )

  // substitute deleted pipettes with new pipettes on the same mount, if any
  if (!isEmpty(substitutionMap) && orderedStepIds.length > 0) {
    // NOTE: using start/end here is meant to future-proof this action for multi-step editing
    dispatch(
      stepFormActions.substituteStepFormPipettes({
        substitutionMap,
        startStepId: orderedStepIds[0],
        endStepId: last(orderedStepIds),
      })
    )
  }

  // delete any pipettes no longer in use
  if (pipetteIdsToDelete.length > 0) {
    dispatch(stepFormActions.deletePipettes(pipetteIdsToDelete))
  }

  closeModal()
}

const mergeProps = (
  stateProps: SP,
  dispatchProps: { dispatch: ThunkDispatch<*> },
  ownProps: OP
): Props => {
  const { dispatch } = dispatchProps
  const { _prevPipettes, _orderedStepIds, ...passThruStateProps } = stateProps
  const updatePipettes = makeUpdatePipettes(
    _prevPipettes,
    _orderedStepIds,
    dispatch,
    ownProps.closeModal
  )

  return {
    ...ownProps,
    useProtocolFields: false,
    ...passThruStateProps,
    onSave: updatePipettes,
    onCancel: ownProps.closeModal,
  }
}

export default connect<Props, OP, SP, {||}, _, _>(
  mapSTP,
  null,
  mergeProps
)(FilePipettesModal)
