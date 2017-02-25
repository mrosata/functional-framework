"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'

import {dispatch, dispatchAsync} from '../index'


/**
 * Example onchange event on the checkbox in jsx.
 */
function alertWhenCheckboxChanges(){
  alert('(on)Change is Good! ...or so they say...')
}


/**
 * Pass each component that is imported from another file the {state} object
 * We can update the component jsx using the current state and
 * dispatch actions up to "redux-ish" to make changes.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const ExampleComponent = ({state: {balance}}) => {
  // Using destructuring in the params above we don't have to do
  // const balance = state.balance
  // uncomment line below, it's already set
  // log(`balance -> ${balance}`)

  return (
    <div>
      {/*  Sending Action Up Into Redux-ish (see data-store/reducers.js) */}

      <form className="form">
        <legend>Deposit or Withdraw from the Bank.</legend>
        <h4 className="label"> balance: {balance}</h4>

        <div className="form-group">
          {/* Input to select amount to add or subtract */}
          <label htmlFor="money-input">Monopoly Moneys:
            <input type="number" className="input-control" value="0" step="1" min="0" name="money-input" id="money-input"/>
          </label>
        </div>

        <div className="form-group">
          {/* Buttons to dispatch the action */}
          <span className="btn btn-success fa fa-arrow-circle-o-up"
                onclick={depositMoney('input[name=money-input]')}> &nbsp; DEPOSIT</span>
          <span className="btn btn-danger fa fa-arrow-circle-down"
                onclick={withdrawMoney('input[name=money-input]')}> &nbsp; WITHDRAW</span>
        </div>

      </form>

    </div>
  )
}


/**
 * Call this with the CSS Selector for an input, it returns a function that has
 * that selector bound to it, grabs the value from the selector and dispatches action.
 */
function depositMoney(inputSelector) {
  return () => {
    const inputField = document.querySelector(inputSelector)
    if (inputField && inputField instanceof HTMLElement) {
      // Dispatch the action (handled in app/data-store/reducers/example-reducer.js)
      dispatch({type: 'DEPOSIT', value: +(inputField.value)})
    }
  }
}

// Same as above. You could refactor these 2 functions to just be 1.
// Use a 2nd arg for Action Name 'DEPOSIT' 'WITHDRAW'
function withdrawMoney(inputSelector) {
  return () => {
    const inputField = document.querySelector(inputSelector)
    if (inputField && inputField instanceof HTMLElement) {
      // Dispatch the action (handled in app/data-store/reducers/example-reducer.js)
      dispatch({type: 'WITHDRAW', value: +(inputField.value)})
    }
  }
}

export default ExampleComponent
