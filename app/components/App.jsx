"use strict"
import dom from '../utils/dom'

import Router, {Route, Link} from './Router'
import Example from './Example'
import Calendar from './Calendar'
import Navigation from './Navigation'

import Room from './Admin/Room/Room'

import { dispatchAsync } from '../index'




/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const AppComponent = ({state, dispatch}) => {

    return (
      <div className="container">

        {/*  Navigation  */}
        <Navigation state={state}>
          {/* Note: Nested children will be the 2nd argument passed to your component */}
          <strong>Democracy Center</strong>
          <span className="small">
            &nbsp; Events &nbsp;
            <i className="fa fa-flag"/>
          </span>
        </Navigation>

        <Router className="row" state={state} dispatch={dispatch}>
          {/*  Calendar route="calendar" */}
          <Route route="index" state={state} dispatch={dispatch} component={Calendar}/>
          {/* Example route="example" */}
          <Route route="example"  state={state} dispatch={dispatch} component={Example}/>
          {/*  Admin route="" */}
          <Route route="admin"  state={state} dispatch={dispatch} component={Room}/>
        </Router>

      </div>
    );
  };


  export default AppComponent
