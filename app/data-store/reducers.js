"use strict"

export const defaultState = {
  balance: 0,
  calendarEvents: []
}

/**
 * When an action is dispatched, we handle it here. It is checked and then
 * reduced and then the state is finally updated. Don't mutate the state,
 * if the state doesn't change then just return the state passed in. This
 * reducer is setup as an example. //TODO: Create combineReducers function
 *
 * @param  {object} [state=defaultState] - The current app state
 * @param  {Action} action               - Action describing change to make
 * @return {object}                      - The next state
 */
const mainReducer = (state = defaultState, action) => {
  switch (action.type) {

    case 'DEPOSIT':
      return Object.assign({}, state, {balance: state.balance + action.value})

    case 'WITHDRAW':
      return Object.assign({}, state, {balance: state.balance - action.value})

    case 'SET_EVENTS':
      return Object.assign({}, state, {calendarEvents: [].concat(action.value)})

    case 'INITIAL':
      return action.value

    default:
      return state

  }
}

export default mainReducer
