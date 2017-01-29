"use strict";
import App from './components/App';
import dom, {renderDOM} from 'utils/dom';
import {log, info, error} from 'utils/logger';

import './styles/main.scss';

const defaultState = {};

const updateView = renderDOM(
  state => {
    log('state', state);
    return (
      <div>
        <App state={state}/>
      </div>
    )}, document.getElementById('app')
);


// Just call this again anytime the state is updated
updateView(defaultState);
