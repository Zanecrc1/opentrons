// @flow
import * as React from 'react'
import FileUploadMessageModal from './FileUploadMessageModal'
import { connect } from 'react-redux'
import {
  selectors as loadFileSelectors,
  actions as loadFileActions,
} from '../../../load-file'
import type { Dispatch } from 'redux'
import type { BaseState } from '../../../types'

type Props = React.ElementProps<typeof FileUploadMessageModal>

type SP = {|
  message: $PropertyType<Props, 'message'>,
|}

type DP = $Rest<$Exact<Props>, SP>

function mapStateToProps(state: BaseState): SP {
  return {
    message: loadFileSelectors.getFileUploadMessages(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch<*>): DP {
  return {
    dismissModal: () => dispatch(loadFileActions.dismissFileUploadMessage()),
  }
}

export default connect<Props, {||}, SP, DP, _, _>(
  mapStateToProps,
  mapDispatchToProps
)(FileUploadMessageModal)
