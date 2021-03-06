// @flow
import type { DeckSlot, Mount } from '@opentrons/components'

// COMMANDS

export type PipetteLabwareFieldsV1 = {|
  pipette: string,
  labware: string,
  well: string,
|}

export type AspirateDispenseArgsV1 = {|
  ...PipetteLabwareFieldsV1,
  volume: number,
  offsetFromBottomMm?: ?number,
  'flow-rate'?: ?number,
|}

export type CommandV1 =
  | {|
      command: 'aspirate' | 'dispense',
      params: AspirateDispenseArgsV1,
    |}
  | {|
      command: 'pick-up-tip' | 'drop-tip' | 'blowout',
      params: PipetteLabwareFieldsV1,
    |}
  | {|
      command: 'touch-tip',
      params: {|
        ...PipetteLabwareFieldsV1,
        offsetFromBottomMm?: ?number,
      |},
    |}
  | {|
      command: 'delay',
      /** number of seconds to delay (fractional values OK),
    or `true` for delay until user input */
      params: {|
        wait: number | true,
        message: ?string,
      |},
    |}
  | {|
      command: 'air-gap',
      params: {|
        pipette: string,
        volume: number,
      |},
    |}

// File Subtypes

type VersionString = string // eg '1.0.0'

// NOTE: these are an enum type in the spec, but it's inconvenient to flow-type them.
type PipetteModel = string
type PipetteName = string

export type FilePipetteV1 = {
  mount: Mount,
  model: PipetteModel,
  name?: PipetteName,
}

export type FileLabwareV1 = {
  slot: DeckSlot,
  model: string,
  'display-name'?: string,
}

type FlowRateForPipettes = {
  [PipetteModel]: number,
}

// A v1 JSON protocol file
export type SchemaV1ProtocolFile<DesignerApplicationData> = {
  'protocol-schema': VersionString,

  metadata: {
    'protocol-name'?: string,
    author?: string,
    description?: string,
    created?: number,
    'last-modified'?: number | null,
    category?: string | null,
    subcategory?: string | null,
    tags?: Array<string>,
  },

  'default-values': {
    'aspirate-flow-rate': FlowRateForPipettes,
    'dispense-flow-rate': FlowRateForPipettes,
    'aspirate-mm-from-bottom': number,
    'dispense-mm-from-bottom': number,
    'touch-tip-mm-from-top'?: number,
  },

  'designer-application': {
    'application-name': string,
    'application-version': ?string,
    data: DesignerApplicationData,
  },

  robot: {
    model: 'OT-2 Standard',
  },

  pipettes: {
    [instrumentId: string]: FilePipetteV1,
  },

  labware: {
    [labwareId: string]: FileLabwareV1,
  },

  procedure: Array<{
    annotation: {
      name: string,
      description: string,
    },
    subprocedure: Array<CommandV1>,
  }>,
}
