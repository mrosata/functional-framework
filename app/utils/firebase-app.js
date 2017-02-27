"use strict"
import firebase from 'firebase'


class FirebaseInstance {

  /**
   * Setup the Firebase Instance by calling this with app keys.
   * This only has to be done once and should be done through the
   * app/index.js file as that is the entry for webpack bundle.js.
   *
   * @return {void}
   */
  constructor () {

    try {
      if (typeof window._CONFIG === "undefined" || !window._CONFIG.FIREBASE) {
        throw "Firebase Config Needs To Be Made Public @ window._CONFIG.FIREBASE (Please See the file app/utils/firebase-app.js)"
      }
      // Initialize Firebase
      this.instance = firebase.initializeApp(window._CONFIG.FIREBASE)
    }
    catch(err) {
      console.error(`Unable to initialize Firebase... ${err}`);
      console.trace(`Here's a hint.`)
    }
  }

  get firebase() {
    return firebase
  }

  /**
   * Same as calling firebase.database()
   * @alias firebase.database()
   *
   * @returns {firebase.database.Database|!firebase.database.Database}
   */
  get database() {
    return this.instance.database()
  }

  /**
   * Same as calling firebase.auth()
   * @alias firebase.auth()
   *
   * @returns {!firebase.auth.Auth|firebase.auth.Auth}
   */
  get auth() {
    return this.instance.auth()
  }

  /**
   * Signs the user out from Firebase
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  signOut() {
    //          firebase.auth().signOut()
    return this.firebase.auth().signOut()
  }


  /**
   * Get Token from currentUser
   * @returns {!firebase.Promise.<string>|firebase.Promise<any>}
   */
  getToken() {
    // Using a redirect.
    return this.auth.currentUser.getToken()
  }


  /**
   * Login using a redirect with Firebase to Google
   * @returns {!firebase.Promise.<void>|firebase.Promise<any>}
   */
  googleAuth() {
    // Start a sign in process for an unauthenticated user.
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return firebase.auth().signInWithRedirect(provider);
  }

}


const firebaseApp = new FirebaseInstance()


// aliases for ease of use
const {database, auth} = firebaseApp

/** export aliases to firebaseApp.database and auth */
export {database, auth, firebase}

/**
 * This is our main export, and has the firebase app instance
 * on it under {}.instance, it also has shortcuts to
 * firebase.database() and firebase.auth()
 */
export default firebaseApp
