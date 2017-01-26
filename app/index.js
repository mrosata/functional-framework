"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import RefTrans from './components/ref-trans.jsx';
import './styles/main.scss';


const state = {};
const defaultState = {name: 'Michael', items: ['Learn', 'Here']};

const pureState = (state) => {
  return Object.assign(defaultState, state);
};

ReactDOM.render(<App state={pureState(state)}/>, document.getElementById('app'));

