




/**
 * This function is called by the "redux-like" store after one of our components
 * calls the @function dispatch with an @type Action action. It will update the
 * state of the app and trigger all JSX components to create updated virtual nodes.
 * (so if there is a change in your component afterwards, it will render automagically)
 * .
 * @param state      - the current app state
 * @param action     - an action {type: string, action: mixed}
 * @returns {object} - the new app state (or the old state if no change)
 */
export default (state = defaultState, action) => {

  //TODO should not change state
  switch (action.type) {

    case 'CURRENT_ROOM':
      return Object.assign({}, state, { currentRoom: action.value });

    case 'DELETE_ROOM':
      return Object.assign({}, state, { currentRoom: null }, { rooms: state.rooms.filter((room) => room.key !== action.value.key) });

    case 'UPDATE_ROOM':
      //same as delete then add

      //delete
      var newState = Object.assign({}, state, { currentRoom: null }, { rooms: state.rooms.filter((room) => room.key !== action.value.key) });

      //add new item
      return Object.assign({}, newState, { currentRoom: action.value }, { rooms: [...newState.rooms, action.value] });

    case 'ADD_ROOM':
      return Object.assign({}, state, { currentRoom: action.value }, { rooms: [...state.rooms, action.value] });

    case 'ADD_ROOM_CATCH':
      console.log('in ADD_ROOM_CATCH');
      return state;

    case 'ADD_ROOM_RESOLVE':
      return Object.assign({}, state, { currentRoom: action.value }, { rooms: [...state.rooms, action.value] });


    default:
      // @desc Always have a default to return state object
      return state
  }
}