// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { TitledList } from '@opentrons/components'
import LabwareListItem from './LabwareListItem'

import {
  selectors as robotSelectors,
  actions as robotActions,
} from '../../robot'

import type { State, Dispatch } from '../../types'
import type { Labware, Mount } from '../../robot'

type SP = {|
  disabled: boolean,
  tipracks: Array<Labware>,
  _calibrator: ?Mount,
  _deckPopulated: boolean,
|}

type DP = {| dispatch: Dispatch |}

type Props = {
  tipracks: Array<Labware>,
  disabled: boolean,
  setLabware: (labware: Labware) => mixed,
}

export default withRouter<{||}>(
  connect<Props, _, SP, {||}, State, Dispatch>(
    mapStateToProps,
    null,
    mergeProps
  )(TipRackList)
)

function TipRackList(props: Props) {
  const { tipracks, disabled, setLabware } = props

  return (
    <TitledList title="tipracks" disabled={disabled}>
      {tipracks.map(tr => (
        <LabwareListItem
          {...tr}
          key={tr.slot}
          isDisabled={tr.confirmed}
          confirmed={tr.confirmed}
          onClick={() => setLabware(tr)}
        />
      ))}
    </TitledList>
  )
}

function mapStateToProps(state: State): SP {
  return {
    tipracks: robotSelectors.getTipracks(state),
    disabled: robotSelectors.getTipracksConfirmed(state),
    _calibrator: robotSelectors.getCalibratorMount(state),
    _deckPopulated: robotSelectors.getDeckPopulated(state),
  }
}

function mergeProps(stateProps: SP, dispatchProps: DP): Props {
  const { tipracks, disabled, _calibrator, _deckPopulated } = stateProps
  const { dispatch } = dispatchProps

  return {
    tipracks,
    disabled,
    setLabware: tr => {
      const calibrator = tr.calibratorMount || _calibrator
      if (_deckPopulated && calibrator) {
        dispatch(robotActions.moveTo(calibrator, tr.slot))
      }
    },
  }
}
