"use strict"
import {log} from '../utils/logger'
import {reduce} from 'ramda'

/* Create a styled logging system to show state as actions are dispatched */
const LOGSTYLE = 'font-size: 1rem;font-weight:bold;color:'
const logAction =log.bind(log, `%cAction: `, `${LOGSTYLE}rgb(179, 63, 132)`)
const logCurrentState = log.bind(log, `%cState: `, `${LOGSTYLE}rgb(177, 116, 45)`)
const logNextState = log.bind(log, `%cNext State: `, `${LOGSTYLE}rgb(53, 69, 180)`)

/**
 * @typedef Store
 * @type object
 * @property {function} subscribe - takes function to add to current listeners
 *                                  which will receive updates on state change.
 * @property {function} getState  - get the state of the app as it currently is.
 * @property {function} dispatch  - pass action to reducers in order to update
 *                                  the state of app @type {Action}
 */
/**
 * Create Store - An ad hoc implementation of Redux
 * @param  {function} reducer - Combined reducers to handle dispatched actions.
 * @param  {object} state - Initial state for store.
 * @return {Store}
 */
export function createStore(reducer, state) {
  let currentReducer = reducer
  let currentState = state
  let currentSubscribers = []
  let nextSubscribers = []
  let isDispatching = false

  const getState = () => currentState
  const subscribe = listenerFn => {
    nextSubscribers.push(listenerFn)
  }


  const dispatch = action => {
    if (isDispatching) {
      throw new Error(`The only way "dispatch" would be called while another
        dispatch is running would be if a reducer had a call to dispatch
        itself. This is not allowed!`)
    }
    isDispatching = true

    try {
      logAction(action)
      logCurrentState(currentState)
      // 1. Get the new state.
      const nextState = reducer(currentState, action)
      logNextState(nextState)
      // 1. Update the current state.
      currentState = nextState
      // 2. Any new subscribers will now be part of current Subscribers.
      currentSubscribers = nextSubscribers
      // 3. Update all subscribers with the new state.
      currentSubscribers.forEach(listener => {
        listener(currentState)
      })
      nextSubscribers = currentSubscribers.slice(0)
    } finally {
      isDispatching = false
    }
  }

  const dispatchAsync = (actionName, promiseFn, optionalValue) => {
    if (typeof actionName !== "string" || (!promiseFn || typeof promiseFn !== "object" || typeof promiseFn.then !== "function")) {
      throw new Error(`The first argument to dispatchAsync should be a string, and the second a promise. `
        + `You passed (${typeof actionName}, ${typeof promiseFn === "object" ? promiseFn.constructor : typeof promiseFn}) `
        + `The name of action you pass will be used to trigger 2 events, a ASYNC event and RESOLVE or REJECT event`
        + ` The dispatchAsync function will dispatch an action type 'NAME_ASYNC', then 'NAME_RESOLVE' or 'NAME_CATCH'`
        + ` --- You should have the chance to catch a rejection and fix it before it is handled by dispatch `
        + `(set that up as part of the promise you pass in.`)
    }
    const actionNameUpper = `${actionName}`.toUpperCase()

    // Dispatch an action when the promise kicks off (with optional value)
    dispatch({type: `${actionNameUpper}_ASYNC`, value: optionalValue})

    return promiseFn
      .then(value => {
        return dispatch({type: `${actionNameUpper}_RESOLVE`, value: value});
      })
      .catch(err => {
        return dispatch({type: `${actionNameUpper}_CATCH`, value: err})
      })
  }


  // Set off an initial dispatch (or else state will be empty)
  dispatch({type: 'INITIAL', value: currentState})
  return {
    subscribe,
    dispatch,
    dispatchAsync,
    getState
  }
}

export function combineReducers(...reducers) {
  return (state = {}, action = {}) => {
    return reduce((accumState, reducer) => {
      return reducer(accumState, action);
    }, state)(reducers)
  }
}

export default {
  createStore,
  combineReducers
}
