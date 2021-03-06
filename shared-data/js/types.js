// @flow
export type WellDefinition = {
  diameter?: number, // NOTE: presence of diameter indicates a circular well
  depth?: number, // TODO Ian 2018-03-12: depth should be required, but is missing in MALDI-plate
  height: number,
  length: number,
  width: number,
  x: number,
  y: number,
  z: number,
  'total-liquid-volume': number,
}

// typedef for deprectated labware definitions
export type LabwareDefinition = {
  metadata: {
    name: string,
    format: string,
    deprecated?: boolean,
    displayName?: string,
    displayCategory?: string,
    isValidSource?: boolean,
    isTiprack?: boolean,
    tipVolume?: number,
  },
  ordering: Array<Array<string>>,
  wells: {
    [well: string]: WellDefinition,
  },
}

export type AllLabwareDefinitions = {
  [name: string]: LabwareDefinition,
}

export type LabwareDisplayCategory =
  | 'tipRack'
  | 'tubeRack'
  | 'trough'
  | 'trash'
  | 'wellPlate'
  | 'other'

export type LabwareVolumeUnits = 'µL' | 'mL' | 'L'

export type LabwareMetadata = {|
  displayName: string,
  displayCategory: LabwareDisplayCategory,
  displayVolumeUnits: LabwareVolumeUnits,
  tags?: Array<string>,
|}

export type LabwareDimensions = {|
  overallLength: number,
  overallWidth: number,
  overallHeight: number,
|}

export type LabwareOffset = {|
  x: number,
  y: number,
  z: number,
|}

// 1. Valid pipette type for a container (i.e. is there multi channel access?)
// 2. Is the container a tiprack?
export type LabwareParameters = {|
  loadName: string,
  format: string,
  isTiprack: boolean,
  tipLength?: number,
  isMagneticModuleCompatible: boolean,
  magneticModuleEngageHeight?: number,
  quirks?: Array<string>,
|}

export type LabwareBrand = {|
  brandId?: Array<string>,
  brand: string,
|}

type LabwareWellShapeProperties =
  | {|
      shape: 'circular',
      diameter: number,
    |}
  | {|
      shape: 'rectangular',
      length: number,
      width: number,
    |}

// well without x,y,z
export type LabwareWellProperties = {|
  ...LabwareWellShapeProperties,
  depth: number,
  totalLiquidVolume: number,
|}

export type LabwareWell = {|
  ...LabwareWellProperties,
  x: number,
  y: number,
  z: number,
|}

// TODO(mc, 2019-03-21): exact object is tough to use with the initial value in
// reduce, so leaving this inexact (e.g. `const a: {||} = {}` errors)
export type LabwareWellMap = {
  [wellName: string]: LabwareWell,
}

// TODO(mc, 2019-03-18): this should eventually replace LabwareDefinition
// NOTE: must be synced with shared-data/labware-json-schema/labware-schema.json
export type LabwareDefinition2 = {|
  otId: string,
  deprecated: boolean,
  metadata: LabwareMetadata,
  dimensions: LabwareDimensions,
  cornerOffsetFromSlot: LabwareOffset,
  parameters: LabwareParameters,
  brand: LabwareBrand,
  ordering: Array<Array<string>>,
  wells: LabwareWellMap,
|}
