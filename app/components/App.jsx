"use strict"
import dom from '../utils/dom'

import Footer from './Footer'
import Example from './Example'
import Calendar from './Calendar'
import Room from './Admin/Room/Room'
import Navigation from './Navigation'
import Router, {Route, Link} from './Router'

import firebaseApp from '../utils/firebase-app'


/**
 * The main component of the App, containing the main template elements.
 *
 * @param {object} state - contains the state of app passed in from index.js
 */
const AppComponent = ({state, dispatch}) => {

  return (
    <div className="container">

      {/*  Navigation  */}
      <Navigation state={state} dispatch={dispatch}>
        {/* Note: Nested children will be the 2nd argument passed to your component */}
        <strong>Democracy Center</strong>
        <span className="small">
            &nbsp; Events &nbsp;
          <i className="fa fa-flag"/>
          </span>
      </Navigation>


      <button onclick={() => firebaseApp.googleAuth()}
        className="btn btn-lg btn-success fa fa-google-plus">Google Signin</button>

      <section className="row">
        {/*  Calendar route="calendar" */}
        <Route route="index" state={state} dispatch={dispatch} component={Calendar}/>
        {/* Example route="example" */}
        <Route route="example" state={state} dispatch={dispatch} component={Example}/>
        {/*  Admin route="" */}
        <Route route="admin" state={state} dispatch={dispatch} component={Room}/>
      </section>

      {/* Footer */}
      <Footer state={state}>
        <strong className="lead label label-danger">
          <i className="fa fa-copyright"></i> MA <em>Web</em>
        </strong> <em className="lead label label-info">Developers</em>
        <strong className="small label label-success">2017</strong>
      </Footer>

    </div>
  );
};


export default AppComponent
