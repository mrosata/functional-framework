"use strict";
import {log} from '../utils/logger';

const LOGSTYLE = 'font-size: 1.025rem;font-weight:bold;color:';
const logAction =log.bind(log, `%cAction: `, `${LOGSTYLE}rgb(179, 63, 132)`);
const logCurrentState = log.bind(log, `%cState: `, `${LOGSTYLE}rgb(177, 116, 45)`);
const logNextState = log.bind(log, `%cNext State: `, `${LOGSTYLE}rgb(53, 69, 180)`);


/**
 * Create Store - An ad hoc implementation of Redux
 * @param  {Function} reducer - Combined reducers to handle dispatched actions.
 * @param  {Object} state - Initial state for store.
 * @return {Object|{subscribe, getState, dispatch}}
 */
export function createStore(reducer, state) {
  let currentReducer = reducer;
  let currentState = state;
  let currentSubscribers = [];
  let nextSubscribers = [];
  let isDispatching = false;

  const getState = () => currentState;
  const subscribe = listenerFn => {
    nextSubscribers.push(listenerFn);
  };

  const dispatch = action => {
    if (isDispatching) {
      throw new Error(`The only way "dispatch" would be called while another
        dispatch is running would be if a reducer had a call to dispatch
        itself. This is not allowed!`);
    }
    isDispatching = true;

    try {
      logAction(action);
      logCurrentState(currentState);
      // 1. Get the new state.
      const nextState = reducer(currentState, action);
      logNextState(nextState);
      // 1. Update the current state.
      currentState = nextState;
      // 2. Any new subscribers will now be part of current Subscribers.
      currentSubscribers = nextSubscribers;
      // 3. Update all subscribers with the new state.
      currentSubscribers.forEach(listener => {
        listener(currentState);
      });
      nextSubscribers = currentSubscribers.slice(0);
    } finally {
      isDispatching = false;
    }
  };

  // Set off an initial dispatch (or else state will be empty)
  dispatch({type: 'INITIAL', value: currentState});
  return {
    subscribe,
    dispatch,
    getState
  }
}

export function combineReducers(...reducers) {

}

export default {
  createStore,
  combineReducers
}
