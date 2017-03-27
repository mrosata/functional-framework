import dom from '../utils/dom'
import {dispatch} from '../index'
import firebaseApp from '../utils/firebase-app'


/**
 * A button that will either sign a user into firebase using Google
 * or sign them out.
 *
 * @param state
 * @param dispatch
 * @returns {VNode}
 */
export default ({state: {auth=null}}) => {

  const isLoggedIn = !!auth

  return (
    <span className='btn btn-lg btn-success fa fa-google-plus'
          onclick={ () => isLoggedIn ? firebaseApp.signOut() : firebaseApp.googleAuth() }>
      {isLoggedIn ? ' Log out' : ' Log in'}
    </span>
  )
}
