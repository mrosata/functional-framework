"use strict"
import Page from './Page';
import Navigation from './Navigation';
import dom from '../utils/dom';
import l from '../utils/logger'

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

      {/*  Page and Footer  */}
      <Page/>
    </div>
  );
};


export default AppComponent
