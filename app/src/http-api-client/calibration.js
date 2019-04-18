// @flow
// http api client module for /calibration/**
import { createSelector } from 'reselect'

import type { OutputSelector } from 'reselect'
import type { State, Action, ThunkPromiseAction } from '../types'
import type { BaseRobot, RobotService, Mount } from '../robot'
import type { ApiCall, ApiRequestError } from './types'
import type {
  ApiRequestAction,
  ApiSuccessAction,
  ApiFailureAction,
} from './actions'

import { apiRequest, apiSuccess, apiFailure, clearApiResponse } from './actions'
import client from './client'

export type JogAxis = 'x' | 'y' | 'z'

export type JogDirection = -1 | 1

export type JogStep = number

export type DeckCalPoint = '1' | '2' | '3'

export type DeckCalMovePoint = 'attachTip' | 'safeZ' | DeckCalPoint

type DeckStartRequest = {|
  force?: boolean,
|}

type DeckStartResponse = {
  token: string,
  pipette: {
    mount: Mount,
    model: string,
  },
}

type DeckCalRequest =
  | {| command: 'attach tip', tipLength: number |}
  | {| command: 'detach tip' |}
  | {| command: 'jog', axis: JogAxis, direction: JogDirection, step: JogStep |}
  | {| command: 'save xy', point: DeckCalPoint |}
  | {| command: 'save z' |}
  | {| command: 'save transform' |}
  | {| command: 'release' |}
  | {| command: 'move', point: DeckCalMovePoint |}

type DeckCalResponse = {
  message: string,
}

type CalPath = 'calibration/deck/start' | 'calibration/deck'

type CalRequest = DeckStartRequest | DeckCalRequest

type CalResponse = DeckStartResponse | DeckCalResponse

export type CalibrationAction =
  | ApiRequestAction<CalPath, CalRequest>
  | ApiSuccessAction<CalPath, CalResponse>
  | ApiFailureAction<CalPath>

export type DeckCalStartState = ApiCall<DeckStartRequest, DeckStartResponse>

export type DeckCalCommandState = ApiCall<DeckCalRequest, DeckCalResponse>

type RobotCalState = {
  'calibration/deck/start'?: DeckCalStartState,
  'calibration/deck'?: DeckCalCommandState,
}

type CalState = {
  [robotName: string]: ?RobotCalState,
}

const DECK: 'calibration/deck' = 'calibration/deck'
const DECK_START: 'calibration/deck/start' = 'calibration/deck/start'

// TODO(mc, 2018-07-05): flow helper until we have one reducer, since
// p === 'constant' checks but p === CONSTANT does not, even if
// CONSTANT is defined as `const CONSTANT: 'constant' = 'constant'`
function getCalPath(p: string): ?CalPath {
  if (p === 'calibration/deck/start' || p === 'calibration/deck') return p

  return null
}

export function startDeckCalibration(
  robot: RobotService,
  force: boolean = false
): ThunkPromiseAction {
  const request = { force }

  return dispatch => {
    dispatch(apiRequest(robot, DECK_START, request))

    return client(robot, 'POST', DECK_START, request)
      .then(
        (res: DeckStartResponse) => apiSuccess(robot, DECK_START, res),
        (err: ApiRequestError) => apiFailure(robot, DECK_START, err)
      )
      .then(dispatch)
  }
}

export function deckCalibrationCommand(
  robot: RobotService,
  request: DeckCalRequest
): ThunkPromiseAction {
  return (dispatch, getState) => {
    const state = getRobotCalState(getState(), robot)
    const startState = getStartStateFromCalState(state)
    const token = startState.response && startState.response.token

    if (request.command === 'release') {
      // $FlowFixMe: (mc, 2019-04-18) http-api-client types need to be redone
      dispatch(clearApiResponse(robot, DECK_START))
    }

    dispatch(apiRequest(robot, DECK, request))

    return client(robot, 'POST', DECK, { ...request, token })
      .then(
        (res: DeckCalResponse) => apiSuccess(robot, DECK, res),
        (err: ApiRequestError) => apiFailure(robot, DECK, err)
      )
      .then(dispatch)
  }
}

export function calibrationReducer(state: ?CalState, action: Action): CalState {
  if (!state) return {}

  switch (action.type) {
    case 'api:REQUEST': {
      const path = getCalPath(action.payload.path)
      if (!path) return state
      const {
        payload: {
          request,
          robot: { name },
        },
      } = action
      const stateByName = state[name] || {}

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { request, inProgress: true, response: null, error: null },
        },
      }
    }

    case 'api:SUCCESS': {
      const path = getCalPath(action.payload.path)
      if (!path) return state
      const {
        payload: {
          response,
          robot: { name },
        },
      } = action
      const stateByName = state[name] || {}
      const stateByPath = stateByName[path] || {}

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, response, inProgress: false, error: null },
        },
      }
    }

    case 'api:FAILURE': {
      const path = getCalPath(action.payload.path)
      if (!path) return state
      const {
        payload: {
          error,
          robot: { name },
        },
      } = action
      const stateByName = state[name] || {}
      const stateByPath = stateByName[path] || {}

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, error, inProgress: false },
        },
      }
    }

    case 'api:CLEAR_RESPONSE': {
      const path = getCalPath(action.payload.path)
      if (!path) return state
      const {
        payload: {
          robot: { name },
        },
      } = action
      const stateByName = state[name] || {}
      const stateByPath = stateByName[path] || {}

      return {
        ...state,
        [name]: {
          ...stateByName,
          [path]: { ...stateByPath, error: null, response: null },
        },
      }
    }
  }

  return state
}

export function makeGetDeckCalibrationStartState() {
  const sel: OutputSelector<
    State,
    BaseRobot,
    DeckCalStartState
  > = createSelector(
    getRobotCalState,
    getStartStateFromCalState
  )

  return sel
}

export function makeGetDeckCalibrationCommandState() {
  const sel: OutputSelector<
    State,
    BaseRobot,
    DeckCalCommandState
  > = createSelector(
    getRobotCalState,
    getDeckStateFromCalState
  )

  return sel
}

function getRobotCalState(state: State, props: BaseRobot): RobotCalState {
  return state.api.calibration[props.name] || {}
}

function getStartStateFromCalState(state: RobotCalState): DeckCalStartState {
  return state[DECK_START] || { inProgress: false }
}

function getDeckStateFromCalState(state: RobotCalState): DeckCalCommandState {
  return state[DECK] || { inProgress: false }
}
