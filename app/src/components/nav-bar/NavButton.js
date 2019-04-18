// @flow
// nav button container
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  selectors as robotSelectors,
  constants as robotConstants,
} from '../../robot'

import { getConnectedRobotUpgradeAvailable } from '../../http-api-client'
import { getAvailableShellUpdate } from '../../shell'
import { NavButton } from '@opentrons/components'

import type { ContextRouter } from 'react-router'
import type { State } from '../../types'

type WithRouterOP = {| name: string |}

type OP = {| ...ContextRouter, ...WithRouterOP |}

type Props = React.ElementProps<typeof NavButton>

export default withRouter<WithRouterOP>(
  connect<Props, OP, _, _, _, _>(mapStateToProps)(NavButton)
)

function mapStateToProps(state: State, ownProps: OP): $Exact<Props> {
  const { name } = ownProps
  const isProtocolLoaded = robotSelectors.getSessionIsLoaded(state)
  const isProtocolRunning = robotSelectors.getIsRunning(state)
  const isProtocolDone = robotSelectors.getIsDone(state)
  const isConnected =
    robotSelectors.getConnectionStatus(state) === robotConstants.CONNECTED
  const robotNotification = getConnectedRobotUpgradeAvailable(state)
  const moreNotification = getAvailableShellUpdate(state) != null

  switch (name) {
    case 'connect':
      return {
        iconName: 'ot-connect',
        title: 'robot',
        url: '/robots',
        notification: robotNotification,
      }
    case 'upload':
      return {
        disabled: !isConnected || isProtocolRunning,
        iconName: 'ot-file',
        title: 'protocol',
        url: '/upload',
      }
    case 'setup':
      return {
        disabled: !isProtocolLoaded || isProtocolRunning || isProtocolDone,
        iconName: 'ot-calibrate',
        title: 'calibrate',
        url: '/calibrate',
      }
    case 'run':
      return {
        disabled: !isProtocolLoaded,
        iconName: 'ot-run',
        title: 'run',
        url: '/run',
      }
  }

  // case 'more':
  return {
    iconName: 'dots-horizontal',
    isBottom: true,
    title: 'more',
    url: '/menu',
    notification: moreNotification,
  }
}
