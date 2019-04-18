// @flow
import cloneDeep from 'lodash/cloneDeep'
import range from 'lodash/range'
import mapValues from 'lodash/mapValues'
import isEmpty from 'lodash/isEmpty'

import { getPipetteNameSpecs } from '@opentrons/shared-data'
import substepTimeline from './substepTimeline'
import {
  utils as steplistUtils,
  type NamedIngred,
  type StepArgsAndErrors,
} from '../steplist'

import type {
  SubstepItemData,
  SourceDestSubstepItem,
  SubstepTimelineFrame,
  StepItemSourceDestRow,
} from './types'

import { consolidate, distribute, transfer, mix } from '../step-generation'

import type { StepIdType } from '../form-types'
import type { InvariantContext, RobotState } from '../step-generation'

import type {
  ConsolidateArgs,
  DistributeArgs,
  MixArgs,
  DelayArgs,
  TransferArgs,
} from '../step-generation/types'
import type { PipetteOnDeck } from '../step-forms'
type AllPipetteData = { [pipetteId: string]: PipetteOnDeck }

export type GetIngreds = (labware: string, well: string) => Array<NamedIngred>

function transferLikeSubsteps(args: {
  stepArgs: ConsolidateArgs | DistributeArgs | TransferArgs | MixArgs,
  allPipetteData: AllPipetteData, // TODO IMMEDIATELY: just use invariantContext
  invariantContext: InvariantContext,
  robotState: RobotState,
  stepId: StepIdType,
}): ?SourceDestSubstepItem {
  const { stepArgs, allPipetteData, invariantContext, stepId } = args

  // Add tips to pipettes, since this is just a "simulation"
  // TODO: Ian 2018-07-31 develop more elegant way to bypass tip handling for simulation/test
  const robotState = cloneDeep(args.robotState)
  robotState.tipState.pipettes = mapValues(
    robotState.tipState.pipettes,
    () => true
  )
  const { pipette: pipetteId } = stepArgs

  const pipette =
    allPipetteData[pipetteId] &&
    getPipetteNameSpecs(allPipetteData[pipetteId].name) // TODO IMMEDIATELY use pipette entity spec

  // TODO Ian 2018-04-06 use assert here
  if (!pipette) {
    console.warn(
      `Pipette "${pipetteId}" does not exist, step ${stepId} can't determine channels`
    )
    return null
  }

  // if false, show aspirate vol instead
  const showDispenseVol = stepArgs.commandCreatorFnName === 'distribute'

  let substepCommandCreators

  // Call appropriate command creator with the validateForm fields.
  // Disable any mix args so those aspirate/dispenses don't show up in substeps
  if (stepArgs.commandCreatorFnName === 'transfer') {
    const commandCallArgs = {
      ...stepArgs,
      mixBeforeAspirate: null,
      mixInDestination: null,
      preWetTip: false,
    }

    substepCommandCreators = transfer(commandCallArgs)(
      invariantContext,
      robotState
    )
  } else if (stepArgs.commandCreatorFnName === 'distribute') {
    const commandCallArgs = {
      ...stepArgs,
      mixBeforeAspirate: null,
      preWetTip: false,
    }

    substepCommandCreators = distribute(commandCallArgs)(
      invariantContext,
      robotState
    )
  } else if (stepArgs.commandCreatorFnName === 'consolidate') {
    const commandCallArgs = {
      ...stepArgs,
      mixFirstAspirate: null,
      mixInDestination: null,
      preWetTip: false,
    }

    substepCommandCreators = consolidate(commandCallArgs)(
      invariantContext,
      robotState
    )
  } else if (stepArgs.commandCreatorFnName === 'mix') {
    substepCommandCreators = mix(stepArgs)(invariantContext, robotState)
  } else {
    // TODO Ian 2018-05-21 Use assert here. Should be unreachable
    console.warn(
      `transferLikeSubsteps got unsupported stepType "${
        stepArgs.commandCreatorFnName
      }"`
    )
    return null
  }

  // Multichannel substeps
  if (pipette.channels > 1) {
    const substepRows: Array<SubstepTimelineFrame> = substepTimeline(
      substepCommandCreators,
      invariantContext,
      { channels: pipette.channels }
    )(invariantContext, robotState)
    const mergedMultiRows: Array<
      Array<StepItemSourceDestRow>
    > = steplistUtils.mergeWhen(
      substepRows,
      (
        currentMultiRow: SubstepTimelineFrame,
        nextMultiRow: SubstepTimelineFrame
      ) => {
        // aspirate then dispense multirows adjacent
        // (inferring from first channel row in each multirow)
        return (
          currentMultiRow &&
          currentMultiRow.source &&
          nextMultiRow &&
          nextMultiRow.dest
        )
      },
      // Merge each channel row together when predicate true
      (currentMultiRow, nextMultiRow) => {
        return range(pipette.channels).map(channelIndex => {
          const sourceChannelWell =
            currentMultiRow.source && currentMultiRow.source.wells[channelIndex]
          const destChannelWell =
            nextMultiRow.dest && nextMultiRow.dest.wells[channelIndex]
          const source = currentMultiRow.source &&
            sourceChannelWell && {
              well: sourceChannelWell,
              preIngreds: currentMultiRow.source.preIngreds[sourceChannelWell],
              postIngreds:
                currentMultiRow.source.postIngreds[sourceChannelWell],
            }
          const dest = nextMultiRow.dest &&
            destChannelWell && {
              well: destChannelWell,
              preIngreds: nextMultiRow.dest.preIngreds[destChannelWell],
              postIngreds: nextMultiRow.dest.postIngreds[destChannelWell],
            }
          const activeTips = currentMultiRow.activeTips
          return {
            activeTips,
            source,
            dest: stepArgs.commandCreatorFnName === 'mix' ? source : dest, // NOTE: since source and dest are same for mix, we're showing source on both sides. Otherwise dest would show the intermediate volume state
            volume: showDispenseVol
              ? nextMultiRow.volume
              : currentMultiRow.volume,
          }
        })
      },
      currentMultiRow =>
        range(pipette.channels).map(channelIndex => {
          const source = currentMultiRow.source && {
            well: currentMultiRow.source.wells[channelIndex],
            preIngreds:
              currentMultiRow.source.preIngreds[
                currentMultiRow.source.wells[channelIndex]
              ],
            postIngreds:
              currentMultiRow.source.postIngreds[
                currentMultiRow.source.wells[channelIndex]
              ],
          }
          const dest = currentMultiRow.dest && {
            well: currentMultiRow.dest.wells[channelIndex],
            preIngreds:
              currentMultiRow.dest.preIngreds[
                currentMultiRow.dest.wells[channelIndex]
              ],
            postIngreds:
              currentMultiRow.dest.postIngreds[
                currentMultiRow.dest.wells[channelIndex]
              ],
          }
          const activeTips = currentMultiRow.activeTips
          return { activeTips, source, dest, volume: currentMultiRow.volume }
        })
    )
    return {
      multichannel: true,
      commandCreatorFnName: stepArgs.commandCreatorFnName,
      parentStepId: stepId,
      multiRows: mergedMultiRows,
    }
  } else {
    // single channel
    const substepRows = substepTimeline(
      substepCommandCreators,
      invariantContext
    )(invariantContext, robotState)

    const mergedRows: Array<StepItemSourceDestRow> = steplistUtils.mergeWhen(
      substepRows,
      (currentRow, nextRow) =>
        // NOTE: if aspirate then dispense rows are adjacent, collapse them into one row
        currentRow.source && nextRow.dest,
      (currentRow, nextRow) => ({
        ...currentRow,
        source: {
          well: currentRow.source && currentRow.source.wells[0],
          preIngreds: currentRow.source && currentRow.source.preIngreds,
          postIngreds: currentRow.source && currentRow.source.postIngreds,
        },
        ...nextRow,
        dest: {
          well: nextRow.dest && nextRow.dest.wells[0],
          preIngreds: nextRow.dest && nextRow.dest.preIngreds,
          postIngreds: nextRow.dest && nextRow.dest.postIngreds,
        },
        volume: showDispenseVol ? nextRow.volume : currentRow.volume,
      }),
      currentRow => {
        const source = currentRow.source && {
          well: currentRow.source.wells[0],
          preIngreds: currentRow.source.preIngreds,
          postIngreds: currentRow.source.postIngreds,
        }
        const dest = currentRow.dest && {
          well: currentRow.dest.wells[0],
          preIngreds: currentRow.dest.preIngreds,
          postIngreds: currentRow.dest.postIngreds,
        }
        return {
          activeTips: currentRow.activeTips,
          source,
          dest,
          volume: currentRow.volume,
        }
      }
    )

    return {
      multichannel: false,
      commandCreatorFnName: stepArgs.commandCreatorFnName,
      parentStepId: stepId,
      rows: mergedRows,
    }
  }
}

// NOTE: This is the fn used by the `allSubsteps` selector
export function generateSubsteps(
  stepArgsAndErrors: ?StepArgsAndErrors,
  allPipetteData: AllPipetteData, // TODO IMMEDIATELY remove
  invariantContext: InvariantContext,
  robotState: ?RobotState,
  stepId: string
): ?SubstepItemData {
  if (!robotState) {
    console.info(
      `No robot state, could not generate substeps for step ${stepId}.` +
        `There was probably an upstream error.`
    )
    return null
  }

  // TODO: BC: 2018-08-21 replace old error check with new logic in field, form, and timeline level
  // Don't try to render with form errors. TODO LATER: presentational error state of substeps?
  if (
    !stepArgsAndErrors ||
    !stepArgsAndErrors.stepArgs ||
    !isEmpty(stepArgsAndErrors.errors)
  ) {
    return null
  }

  const { stepArgs } = stepArgsAndErrors

  if (stepArgs.commandCreatorFnName === 'delay') {
    // just returns formData
    const formData: DelayArgs = stepArgs
    return formData
  }

  if (
    stepArgs.commandCreatorFnName === 'consolidate' ||
    stepArgs.commandCreatorFnName === 'distribute' ||
    stepArgs.commandCreatorFnName === 'transfer' ||
    stepArgs.commandCreatorFnName === 'mix'
  ) {
    return transferLikeSubsteps({
      stepArgs,
      allPipetteData,
      invariantContext,
      robotState,
      stepId,
    })
  }

  console.warn(
    "allSubsteps doesn't support commandCreatorFnName: ",
    stepArgs.commandCreatorFnName,
    stepId
  )
  return null
}
