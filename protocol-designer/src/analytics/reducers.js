// @flow
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { rehydrate } from '../persist'

import type { SetOptIn } from './actions'

type OptInState = boolean | null
const optInInitialState = null
const hasOptedIn = handleActions(
  {
    SET_OPT_IN: (state: OptInState, action: SetOptIn): OptInState =>
      action.payload,
    REHYDRATE_PERSISTED: () =>
      rehydrate('analytics.hasOptedIn', optInInitialState),
  },
  optInInitialState
)

const _allReducers = {
  hasOptedIn,
}

export type RootState = {
  hasOptedIn: OptInState,
}

// TODO(mc, 2019-04-17): PD should have a "global" Action type
export const rootReducer = combineReducers<_, {}>(_allReducers)
