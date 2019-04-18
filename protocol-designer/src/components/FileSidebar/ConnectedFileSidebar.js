// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import assert from 'assert'
import { saveAs } from 'file-saver'
import i18n from '../../localization'
import { actions, selectors } from '../../navigation'
import { selectors as fileDataSelectors } from '../../file-data'
import {
  actions as loadFileActions,
  selectors as loadFileSelectors,
} from '../../load-file'
import FileSidebar from './FileSidebar'
import type { BaseState, ThunkDispatch } from '../../types'

type Props = React.ElementProps<typeof FileSidebar>

type SP = {|
  canDownload: boolean,
  downloadData: ?{
    fileData: Object,
    fileName: string,
  },
  _canCreateNew: ?boolean,
  _hasUnsavedChanges: ?boolean,
|}

export default connect<Props, {||}, SP, {||}, _, _>(
  mapStateToProps,
  null,
  mergeProps
)(FileSidebar)

function mapStateToProps(state: BaseState): SP {
  const protocolName =
    fileDataSelectors.getFileMetadata(state)['protocol-name'] || 'untitled'
  const fileData = fileDataSelectors.createFile(state)
  const canDownload = selectors.getCurrentPage(state) !== 'file-splash'

  return {
    canDownload,
    downloadData: canDownload
      ? {
          fileData,
          fileName: protocolName + '.json',
        }
      : null,
    // Ignore clicking 'CREATE NEW' button in these cases
    _canCreateNew: !selectors.getNewProtocolModal(state),
    _hasUnsavedChanges: loadFileSelectors.getHasUnsavedChanges(state),
  }
}

function mergeProps(
  stateProps: SP,
  dispatchProps: { dispatch: ThunkDispatch<*> }
): Props {
  const {
    _canCreateNew,
    _hasUnsavedChanges,
    canDownload,
    downloadData,
  } = stateProps
  const { dispatch } = dispatchProps
  return {
    loadFile: fileChangeEvent => {
      if (
        !_hasUnsavedChanges ||
        window.confirm(i18n.t('alert.window.confirm_import'))
      ) {
        dispatch(loadFileActions.loadProtocolFile(fileChangeEvent))
      }
    },
    canDownload,
    createNewFile: _canCreateNew
      ? () => dispatch(actions.toggleNewProtocolModal(true))
      : undefined,
    onDownload: () => {
      if (!downloadData) {
        assert(downloadData, 'no download data, could not download file')
        return
      }
      const blob = new Blob([JSON.stringify(downloadData.fileData, null, 4)], {
        type: 'application/json',
      })
      saveAs(blob, downloadData.fileName)
      dispatch(loadFileActions.saveProtocolFile())
    },
  }
}
