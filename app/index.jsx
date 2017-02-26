"use strict"
import './styles/main.scss'

import App from './components/App'
import dom, {renderDOM} from 'utils/dom'
import {createStore} from './data-store/index'
import {database, auth} from './utils/firebase-app'
import reducers, {defaultState} from 'data-store/reducers'
import {setupRouterPopstate} from 'data-store/reducers/router-reducer'


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

// Setup the router so history works
setupRouterPopstate(dispatch, window)

export {dispatch, dispatchAsync, getState}
