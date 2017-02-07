"use strict";

export const defaultState = {
  balance: 0
};

const reducer1 = (state = defaultState, action) => {
  switch (action.type) {
    case 'DEPOSIT':
      return Object.assign({}, state, {balance: state.balance + action.value});
    case 'WITHDRAW':
      return Object.assign({}, state, {balance: state.balance - action.value});
    case 'INITIAL':
      return action.value;
    default:
      return state;
  }
}

export default reducer1;
