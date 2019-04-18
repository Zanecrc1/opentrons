// @flow
// setup pipettes component
import * as React from 'react'
import { connect } from 'react-redux'

import { selectors as robotSelectors } from '../../robot'
import { makeGetRobotPipettes, fetchPipettes } from '../../http-api-client'
import { getPipetteModelSpecs } from '@opentrons/shared-data'
import InstrumentItem from './InstrumentItem'
import { RefreshWrapper } from '../Page'
import { SectionContentHalf } from '../layout'
import InfoSection from './InfoSection'
import InstrumentWarning from './InstrumentWarning'

import type { State, Dispatch } from '../../types'
import type { Pipette } from '../../robot'
import type { PipettesResponse } from '../../http-api-client'
import type { Robot } from '../../discovery'

type OP = {| robot: Robot |}

type SP = {|
  pipettes: Array<Pipette>,
  actualPipettes: ?PipettesResponse,
|}

type DP = {|
  fetchPipettes: () => mixed,
  changePipetteUrl: string,
|}

type Props = { ...OP, ...SP, ...DP }

const TITLE = 'Required Pipettes'

export default connect<Props, OP, SP, DP, State, Dispatch>(
  makeMapStateToProps,
  mapDispatchToProps
)(ProtocolPipettes)

function ProtocolPipettes(props: Props) {
  const { pipettes, actualPipettes, fetchPipettes, changePipetteUrl } = props

  if (pipettes.length === 0) return null

  const pipetteInfo = pipettes.map(p => {
    const pipetteConfig = getPipetteModelSpecs(p.name)
    const displayName = !pipetteConfig ? 'N/A' : pipetteConfig.displayName

    const actualModel = actualPipettes && actualPipettes[p.mount].model
    let pipettesMatch = true

    if (pipetteConfig && actualModel !== p.name) {
      pipettesMatch = false
    }

    return {
      ...p,
      displayName,
      pipettesMatch,
    }
  })

  const pipettesMatch = pipetteInfo.every(p => p.pipettesMatch)

  return (
    <RefreshWrapper refresh={fetchPipettes}>
      <InfoSection title={TITLE}>
        <SectionContentHalf>
          {pipetteInfo.map(p => (
            <InstrumentItem
              key={p.mount}
              match={p.pipettesMatch}
              mount={p.mount}
            >
              {p.displayName}
            </InstrumentItem>
          ))}
        </SectionContentHalf>
        {!pipettesMatch && (
          <InstrumentWarning instrumentType="pipette" url={changePipetteUrl} />
        )}
      </InfoSection>
    </RefreshWrapper>
  )
}

function makeMapStateToProps(): (state: State, ownProps: OP) => SP {
  const getAttachedPipettes = makeGetRobotPipettes()

  return (state, ownProps) => {
    const pipettesCall = getAttachedPipettes(state, ownProps.robot)

    return {
      pipettes: robotSelectors.getPipettes(state),
      actualPipettes: pipettesCall && pipettesCall.response,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OP): DP {
  const { robot } = ownProps
  // TODO(mc, 2018-10-10): pass this prop down from page
  const changePipetteUrl = `/robots/${robot.name}/instruments`

  return {
    changePipetteUrl,
    fetchPipettes: () => dispatch(fetchPipettes(robot)),
  }
}
