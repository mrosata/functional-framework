"use strict"
import dom from '../utils/dom'

import Page from './Page'
import Example from './Example'
import Calendar from './Calendar'
import Navigation from './Navigation'

/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 * @param {object} dispatch - function to call with ({action: STRING, value: MIXED})
 */
const AppComponent = ({state, dispatch}) => {

  return (
    <div className="container">

      {/*  Navigation  */}
      <Navigation/>

      {/*  Calendar  */}
      <div className="row">
        <Calendar state={state} dispatch={dispatch} />
      </div>

      {/*  Example DOM */}
      <div className="row">
        <Example state={state} dispatch={dispatch} />
      </div>


      {/*  Page and Footer  */}
      <Page/>

    </div>
  );
};


export default AppComponent
