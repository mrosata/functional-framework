"use strict"
import dom from '../utils/dom'
import {log} from '../utils/logger'

import Field from './Form/Field-class';

import {dispatch, dispatchAsync} from '../index'


/**
 * Example onchange event on the checkbox in jsx.
 */
function alertWhenCheckboxChanges() {
  alert('(on)Change is Good! ...or so they say...')
}

const isEven = (value) => +value % 2 === 0;

const NumberInput = new Field({
  name: 'money-input',
  type:         'number',
  defaultValue: 10, // THIS MIGHT NOT WORK YET
  props: {
    step: 1,
    max: 1000,
    min: 0
  },
  errorMsg: 'Only Even Numbers Allowed!',
  willDispatch: false,
  validation: isEven
});


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

  /**
   * IT IS GOOD TO KNOW:
   *     'BANK_SUBMIT_INVALID', 'WITHDRAW_INVALID' AND 'NOT_HANDLED_BUT_NEEDED'
   *     are all unhandled dispatches. The reason they are needed is that they
   *     updated the Field when it is invalid.
   *        -- reason: in order to re-render field showing validation message
   *                   this component needs to re-render, so something, anything,
   *                   it doesn't matter really, has to be dispatched to show
   *                   validation markup.
   */

  return (
    <div>
      {/*  Sending Action Up Into Redux-ish (see data-store/reducers.js) */}

      <form className="form" onsubmit={()=>NumberInput.condDispatch('DEPOSIT', 'BANK_SUBMIT_INVALID', false)}>
        <legend>Deposit or Withdraw from the Bank.</legend>
        <h4 className="label"> balance: {balance}</h4>

        <div className="form-group">
          {/* Input to select amount to add or subtract */}
          <label htmlFor="money-input">Monopoly Moneys:
          </label>
          {NumberInput.jsx()}
        </div>

        <div className="form-group">
          {/* Buttons to dispatch the action */}
          <span className="btn btn-success fa fa-arrow-circle-o-up"
                onclick={bankTransaction('DEPOSIT', NumberInput)}> &nbsp; DEPOSIT</span>
          <span className="btn btn-danger fa fa-arrow-circle-down"
                onclick={() => NumberInput.condDispatch('WITHDRAW', 'WITHDRAW_INVALID')}> &nbsp; WITHDRAW</span>
        </div>

      </form>

    </div>
  )
}


function bankTransaction(transType, inputField) {
  return () => {
    // Dispatch the action (handled in app/data-store/reducers/example-reducer.js)
    if (inputField.isValid) {
      dispatch({type: transType, value: +(inputField.value)})
    }
    else {
      // HANDLE SOME ERROR IN VALIDATION?
      dispatch({type: 'NOT_HANDLED_BUT_NEEDED', value: ''})
    }
  }
}

export default ExampleComponent
