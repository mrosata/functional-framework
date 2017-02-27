const FIREBASE_AUTH = 'FIREBASE_AUTH'

import {dispatch} from '../../index'
import firebaseApp from '../../utils/firebase-app'

const {firebase} = firebaseApp

/**
 * This checks that the user is logged in anytime the app loads
 * and listens for a change in auth so if the user becomes
 * unauthenticated or authenticated we can make the right
 * changes into state.
 */
firebase.auth().onAuthStateChanged(function(user) {
  const authValue = user ? user : false
  dispatch({type: 'FIREBASE_AUTH', value: authValue})
})


/**
 * Action to handle Firebase Auth Change
 * @param state
 * @param action
 * @returns {*}
 */
function firebaseAuthChange(state, action) {
  const updatedAuth = {
    auth: action.value
  }

  // Clones the state object and then overwrites state.auth
  return Object.assign({}, state, updatedAuth)
}


/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default (state = {}, action) => {

  switch (action.type) {

    case FIREBASE_AUTH:
      return firebaseAuthChange(state, action)

    default:
      // @desc Always have a default to return state object
      return state
  }
}
