"use strict"
import dom from '../utils/dom'

import Page from './Page'
import Example from './Example'
import Calendar from './Calendar'
import Navigation from './Navigation'
import Room from './Admin/Room/Room'

import {dispatch, dispatchAsync} from '../index'

/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const AppComponent = ({state}) => {

  return (
    <div className="container">

      {/*  Navigation  */}
      <Navigation/>

      {/*  Calendar  */}
      {/*<div className="row">
        <Calendar state={state} dispatch={dispatch} />
      </div>*/}

      {/*  Page and Footer  */}
      <Page/>
      <Room state={state} myval='here is my value' />

      {/*  Example DOM
      <div className="row">
        <Example state={state} dispatch={dispatch} />
      </div>
      */}
    </div>
  );
};


export default AppComponent
