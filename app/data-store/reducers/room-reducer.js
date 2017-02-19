




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

  switch (action.type) {

    case 'ADD_ROOM_ASYNC':
      console.log('in ADD_ROOM_ASYNC');
      return state;

    case 'ADD_ROOM_CATCH':
      console.log('in ADD_ROOM_CATCH');
      return state;

    case 'ADD_ROOM_RESOLVE':
      console.log('in ADD_ROOM_RESOLVE')
      console.log(action.value);

       state.rooms.push(action.value);
       return state;



    default:
      // @desc Always have a default to return state object
      return state
  }
}