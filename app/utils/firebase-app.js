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
    this.isError = false

    try {
      if (typeof window._CONFIG === "undefined" || !window._CONFIG.FIREBASE) {
        throw "Firebase Config Needs To Be Made Public @ window._CONFIG.FIREBASE (Please See the file app/utils/firebase-app.js)"
      }
      // Initialize Firebase
      this.instance = firebase.initializeApp(window._CONFIG.FIREBASE)
    }
    catch(err) {
      this.isError = true
      console.error(`Unable to initialize Firebase... ${err}`);
      console.trace(`Take a hint.`)
    }
  }


  /**
   * @alias firebase.database()
   * @return {firebase.database} Firebase database
   */
  get auth () {
    return typeof this._instance === "undefined" ? void(0) : this._instance.auth()
  }

  set auth(val) {
    throw "Don't set the auth on firebaseApp!"
  }


  /**
   * @alias firebase.database()
   * @return {firebase.database} Firebase database
   */
  get database() {
    return typeof this._instance === "undefined" ? void(0) : this._instance.database()
  }

  set database(val) {
    throw "Don't set the database property on firebaseApp!"
  }


  /**
   * The initialized Firebase Instance For App
   * @return {object}
   */
  get instance() {
    return this._instance
  }

  set instance(value) {
    if (typeof this._instance === "undefined") {
      this._instance = value
      return void 0
    }
    throw "Firebase Instance Should Not Be Set Up Twice!"
  }

}


const firebaseApp = new FirebaseInstance()

// aliases for ease of use
const {database, auth} = firebaseApp

/** export aliases to firebaseApp.database and auth */
export {database, auth}

/**
 * This is our main export, and has the firebase app instance
 * on it under {}.instance, it also has shortcuts to
 * firebase.database() and firebase.auth()
 */
export default firebaseApp
