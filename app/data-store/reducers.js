"use strict"
import routerReducers, {getInitialRouter} from './reducers/router-reducer';
import firebaseReducers from './reducers/firebase-reducer'
import exampleReducers from './reducers/example-reducer'
import roomReducers from './reducers/room-reducer'
import calendarReducers from './reducers/calendar-reducer'
import {combineReducers} from './index'

export const defaultState = {
  balance:        0,
  calendarEvents: [],
  rooms:          [],
  currentRoom:    null,
  router:         getInitialRouter(window.location),
  auth:           null,
  sources:
  [

      {
        room: 1,
        name: 'The Library',
        calendarId: 'bdnha1319u329g6gsr6rcksg6c@group.calendar.google.com',
        visible: true,
        color: '#ccceee',
        textColor: 'black',
        added: false
      }
      ,

      {
        room: 2,
        name: 'The Cesar Chavez Room',
        calendarId: 'led1grg2f8jtbtdrks7hv125fo@group.calendar.google.com',
        visible: true,
        color: '#ccddee',
        textColor: 'black',
        added: false
      }
      ,

      {
        room: 3,
        name: 'The Rosa Parks Room',
        calendarId: '353tn8hvjnrtja3h21gbjgaigo@group.calendar.google.com',
        visible: true,
        color: '#BADA55',
        textColor: 'black',
        added: false
      }
      ,

      {
        room: 4,
        name: 'Nelson Mandela Room',
        calendarId: 't0gnqindnl5hfu7noj4iu3dvek@group.calendar.google.com',
        visible: true,
        color: '#eeeDCC',
        textColor: 'black',
        added: false
      }
    ]
}

/**
 * When an action is dispatched, we handle it here. It is checked and then
 * reduced and then the state is finally updated. Don't mutate the state,
 * if the state doesn't change then just return the state passed in. This
 * reducer is setup as an example.
 *
 * @param  {object} [state=defaultState]      - The current app state
 * @param  {{type:string,value:mixed}} action - Action describing change to make
 *
 * @return {object}                           - The next state
 */
const mainReducer = (state = defaultState, action) => {
  switch (action.type) {

    case 'SET_EVENTS':
      return Object.assign({}, state, {calendarEvents: [].concat(action.value)})

    case 'INITIAL':
      return action.value

    default:
      return state

  }
}


/**
 * Each argument should be a reducer function like the one above.
 * combineReducers is variadic up to 255 args.
 * That's a lot of reductions!
 *
 * Import your custom reducer at the top of file and add it as an argument here
 */
export default combineReducers(mainReducer, exampleReducers, roomReducers, routerReducers,calendarReducers, firebaseReducers);
