"use strict";
import './styles/main.scss';
import App from './components/App';
import dom, {renderDOM} from 'utils/dom';
import reducers, {defaultState} from 'data-store/reducers';

import {log, info, error} from 'utils/logger';
import {createStore} from './data-store/index';


const store = createStore(reducers, defaultState);
const {subscribe, dispatch, getState} = store;


/**
 * updateView takes updated state objects and then renders
 * them into the DOM. renderDOM uses virtual-dom, so only
 * elements that need to be re-render will actually be rendered.
 * @type {Function}
 */
const updateView = renderDOM(
  (state) => {
    return (
      <div class="container">
        <h3> balance: {state.balance}</h3>
        <span className="btn btn-success" onclick={() => dispatch({type: 'DEPOSIT', value: 100})}>DEPOSIT</span>
        <App state={state}/>
      </div>
    )}, document.getElementById('app'), store.getState()
);

// Just call this again anytime the state is updated
const unsubscribe = subscribe(updatedState => {
  updateView(updatedState);
});
