// @flow
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import type { Action } from '../types'
import type { FileUploadMessage, LoadFileAction } from './types'
import type { FileUploadMessageAction } from './actions'

// Keep track of file upload errors / messages
type FileUploadMessageState = ?FileUploadMessage
const fileUploadMessage = handleActions<FileUploadMessageState, *>(
  {
    FILE_UPLOAD_MESSAGE: (
      state,
      action: FileUploadMessageAction
    ): FileUploadMessageState => action.payload,
    LOAD_FILE: (state, action: LoadFileAction): FileUploadMessageState =>
      action.payload.didMigrate
        ? { isError: false, messageKey: 'didMigrate' }
        : state,
    DISMISS_FILE_UPLOAD_MESSAGE: (): FileUploadMessageState => null,
  },
  null
)

// NOTE: whenever we add or change any of the action types that indicate
// "changes to the protocol", those action types need to be updated here.
const unsavedChanges = (
  state: boolean = false,
  action: { type: string, payload: any }
): boolean => {
  switch (action.type) {
    case 'LOAD_FILE': {
      return action.payload.didMigrate // no unsaved changes unless migration happened
    }
    case 'SAVE_PROTOCOL_FILE':
      return false
    case 'CREATE_NEW_PROTOCOL':
    case 'DISMISS_FORM_WARNING':
    case 'DISMISS_TIMELINE_WARNING':
    case 'CREATE_CONTAINER':
    case 'DELETE_CONTAINER':
    case 'CHANGE_SAVED_STEP_FORM':
    case 'DUPLICATE_LABWARE':
    case 'SWAP_SLOT_CONTENTS':
    case 'RENAME_LABWARE':
    case 'DELETE_LIQUID_GROUP':
    case 'EDIT_LIQUID_GROUP':
    case 'REMOVE_WELLS_CONTENTS':
    case 'SET_WELL_CONTENTS':
    case 'ADD_STEP':
    case 'DELETE_STEP':
    case 'SAVE_STEP_FORM':
    case 'SAVE_FILE_METADATA':
      return true
    default:
      return state
  }
}

export const _allReducers = {
  fileUploadMessage,
  unsavedChanges,
}

export type RootState = {
  fileUploadMessage: FileUploadMessageState,
  unsavedChanges: boolean,
}

const rootReducer = combineReducers<_, Action>(_allReducers)

export default rootReducer
