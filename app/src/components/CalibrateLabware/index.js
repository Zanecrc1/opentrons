// @flow
// info panel and controls for labware calibration page
import * as React from 'react'
import { withRouter } from 'react-router'
import type { Labware } from '../../robot'
import DeckMap from '../DeckMap'
import InfoBox from './InfoBox'

type Props = { labware: ?Labware }

export default withRouter<$Exact<Props>>(CalibrateLabware)

function CalibrateLabware(props: Props) {
  return (
    <div>
      <InfoBox labware={props.labware} />
      <DeckMap />
    </div>
  )
}
