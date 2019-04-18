/* eslint-disable no-use-before-define */
// @flow
// application types
import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'
import type { RouterAction } from 'react-router-redux'

import typeof reducer from './reducer'
import type { Action as RobotAction } from './robot'
import type { HttpApiAction } from './http-api-client'
import type { ShellAction } from './shell'
import type { ConfigAction } from './config'
import type { DiscoveryAction } from './discovery'
import type { ProtocolAction } from './protocol'

export type Action =
  | RobotAction
  | HttpApiAction
  | ShellAction
  | ConfigAction
  | RouterAction
  | DiscoveryAction
  | ProtocolAction

export type State = $Call<reducer, {}, Action>

export type GetState = () => State

export type ActionType = $PropertyType<Action, 'type'>

export type ThunkAction = (Dispatch, GetState) => ?Action

export type ThunkPromiseAction = (Dispatch, GetState) => Promise<?Action>

export type Store = ReduxStore<State, Action>

export type Dispatch = PlainDispatch & ThunkDispatch & ThunkPromiseDispatch

export type Middleware = (s: MwStore) => (n: PlainDispatch) => PlainDispatch

type MwStore = {
  getState: GetState,
  dispatch: Dispatch,
}

type PlainDispatch = ReduxDispatch<Action>

type ThunkDispatch = (thunk: ThunkAction) => ?Action

type ThunkPromiseDispatch = (thunk: ThunkPromiseAction) => Promise<?Action>

export type Error = { name: string, message: string }
