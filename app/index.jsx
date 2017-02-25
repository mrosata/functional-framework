"use strict"
import './styles/main.scss'

import App from './components/App'
import dom, {renderDOM} from 'utils/dom'
import reducers, {defaultState} from 'data-store/reducers'
import {createStore} from './data-store/index'
import {database, auth} from './utils/firebase-app'
import {log} from './utils/logger'

database.ref('/events').on('value', (snapshot) => {
  log('Data From Firebase -> ', snapshot.exportVal())
})

// Setup Our Store. (also only needs to be done once)
const {subscribe, dispatch, dispatchAsync, getState} = createStore(reducers, defaultState)


/**
 * MAIN ENTRY POINT FOR ENTIRE APPLICATION
 *
 * updateView takes updated state objects and then renders
 * them into the DOM. renderDOM uses virtual-dom, so only
 * elements that need to be re-render will actually be rendered.
 * --- So `updateView` is just a function we pass an {} holding all app state
 * @type {function}
 */
const updateView = renderDOM(
  (state) => <App state={state} dispatch={dispatch} />, document.getElementById('app'), getState()
)


// We will likely never need to call "unsubscribe" because this probably
// will be a 1 page 1 view app. I'll never unsubscribe from Netflix either,
// but it's nice knowing that I have the choice.
const unsubscribe = subscribe(
  updatedState => {
    /*
     * `updateview` needs to be called everytime the state is updated
     *              Unless you change something without using the dispatch
     *              function (that we pass through the JSX templates),
     *              then you'll never have to worry about actualy calling
     *              updateView
     */
    updateView(updatedState)
    return void 0
})



window.onpopstate = function() {

  if (window && window.location) {
    const {hash} = window.location || '#';
    dispatch({type: 'NAVIGATE_FROM_HASH', value: hash})
  }
};

export {dispatch, dispatchAsync, getState}


/*

// Uncomment this if you would like to see how the dispatchAsync works.
// There are no reducers that handle it, so it won't have an effect on
// the state of app... but you can see it dispatch action in web console.

dispatchAsync('STEEL', new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`This should be value of 'STEEL_RESOLVE'`)
  }, 1000)
}))

*/
