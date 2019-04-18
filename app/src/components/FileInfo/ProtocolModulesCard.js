// @flow
// setup modules component
import * as React from 'react'
import { connect } from 'react-redux'

import { getModuleDisplayName } from '@opentrons/shared-data'
import { selectors as robotSelectors } from '../../robot'
import {
  makeGetRobotModules,
  fetchModules,
  type FetchModulesResponse,
} from '../../http-api-client'

import { RefreshWrapper } from '../Page'
import InfoSection from './InfoSection'
import { SectionContentHalf } from '../layout'
import InstrumentItem from './InstrumentItem'
import InstrumentWarning from './InstrumentWarning'

import type { State, Dispatch } from '../../types'
import type { SessionModule } from '../../robot'
import type { Robot } from '../../discovery'

type OP = {| robot: Robot |}

type SP = {|
  modules: Array<SessionModule>,
  actualModules: ?FetchModulesResponse,
  attachModulesUrl: string,
|}

type DP = {| fetchModules: () => mixed |}

type Props = { ...OP, ...SP, ...DP }

const TITLE = 'Required Modules'

export default connect<Props, OP, SP, DP, _, _>(
  makeMapStateToProps,
  mapDispatchToProps
)(ProtocolModulesCard)

function ProtocolModulesCard(props: Props) {
  const { modules, actualModules, fetchModules, attachModulesUrl } = props

  if (modules.length < 1) return null

  const moduleInfo = modules.map(module => {
    const displayName = getModuleDisplayName(module.name)

    const actualModel =
      actualModules && actualModules.modules.find(m => m.name === module.name)

    const modulesMatch = actualModel != null && actualModel.name === module.name

    return {
      ...module,
      displayName,
      modulesMatch,
    }
  })

  const modulesMatch = moduleInfo.every(m => m.modulesMatch)

  return (
    <RefreshWrapper refresh={fetchModules}>
      <InfoSection title={TITLE}>
        <SectionContentHalf>
          {moduleInfo.map(m => (
            <InstrumentItem key={m.slot} match={m.modulesMatch}>
              {m.displayName}{' '}
            </InstrumentItem>
          ))}
        </SectionContentHalf>
        {!modulesMatch && (
          <InstrumentWarning instrumentType="module" url={attachModulesUrl} />
        )}
      </InfoSection>
    </RefreshWrapper>
  )
}

function makeMapStateToProps(): (state: State, ownProps: OP) => SP {
  const getActualModules = makeGetRobotModules()

  return (state, ownProps) => {
    const { robot } = ownProps
    const modulesCall = getActualModules(state, robot)

    return {
      modules: robotSelectors.getModules(state),
      actualModules: modulesCall && modulesCall.response,
      // TODO(mc, 2018-10-10): pass this prop down from page
      attachModulesUrl: `/robots/${robot.name}/instruments`,
    }
  }
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OP): DP {
  return {
    fetchModules: () => dispatch(fetchModules(ownProps.robot)),
  }
}
