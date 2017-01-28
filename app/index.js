"use strict";
import App from './components/App';
import dom, {renderDOM} from 'utils/dom';

import './styles/main.scss';

const defaultState = {name: 'Michael', items: ['Learn', 'Here']};


const updateView = renderDOM(
  state => (
    <div>
      <App state={state}/>
    </div>
  ), document.getElementById('app'));


// Just call this again anytime the state is updated
updateView(defaultState);
