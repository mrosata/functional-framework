"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'
import Calendar from './Calendar'



/**
 * Example onchange event on the checkbox in jsx.
 */
function alertWhenCheckboxChanges(){
  alert('(on)Change is Good! ...or so they say...')
}


/**
 * Pass each component that is imported from another file the {state} object
 * as well as the {dispatch} function so that we can A. update the components
 * jsx using the current state and dispatch actions up to "redux-ish" to make
 * changes.
 *
 * @param {object} state - contains the state of app passed in from index.js
 * @param {object} dispatch - function to call with ({action: STRING, value: MIXED})
 */
const ExampleComponent = ({state: {balance}, dispatch}) => {
  // Using destructuring in the params above we don't have to do
  // const balance = state.balance;
  // uncomment line below, it's already set
  // log(`balance -> ${balance}`)

  return (
    <div className="container">

      {/*  Setting OnChange Event  */}
      <input type="checkbox" checked={true} onchange={alertWhenCheckboxChanges} />

      {/*  Sending Action Up Into Redux-ish (see data-store/reducers.js) */}
      <div>
        <h3> balance: {balance}</h3>

        <span className="btn btn-success"
              onclick={
                () => dispatch({type: 'DEPOSIT', value: 100})}>DEPOSIT 100 MONEYS</span>

      </div>

    </div>
  );
};


export default ExampleComponent
