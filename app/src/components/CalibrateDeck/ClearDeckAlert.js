// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { deckCalibrationCommand as dcCommand } from '../../http-api-client'
import ClearDeckAlertModal from '../ClearDeckAlertModal'

import type { CalibrateDeckProps } from './types'

type OP = CalibrateDeckProps

type DP = {|
  onContinue: () => mixed,
  onCancel: () => mixed,
|}

type Props = { ...$Exact<OP>, ...DP }

export default connect(
  null,
  mapDispatchToProps
)(ClearDeckAlert)

function ClearDeckAlert(props: Props) {
  return (
    <ClearDeckAlertModal
      parentUrl={props.parentUrl}
      cancelText="cancel"
      continueText="move pipette to front"
      onCancelClick={props.onCancel}
      onContinueClick={props.onContinue}
    />
  )
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OP): DP {
  const {
    robot,
    match: { url },
  } = ownProps

  return {
    onContinue: () => {
      dispatch(dcCommand(robot, { command: 'move', point: 'attachTip' }))
      dispatch(push(`${url}/step-1`))
    },
    onCancel: () => dispatch(dcCommand(robot, { command: 'release' })),
  }
}
