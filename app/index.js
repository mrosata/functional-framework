"use strict";
import App from './components/app.jsx';
import RefTrans from './components/ref-trans.jsx';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

import './styles/main.scss';


const state        = {};
const defaultState = {name: 'Michael', items: ['Learn', 'Here']};

const pureState = (state) => {
  return Object.assign(defaultState, state);
};
let rootElem;

//renderApp(<App state={pureState(state)}/>, document.getElementById('app'));
renderApp(<div>
  <h1>hello</h1>
  <ul>
    <li key="1">Hello</li>
    <li key="2">There</li>
  </ul>
</div>, document.getElementById('app'));


setTimeout(() => {
  const elem = (
    <div>
      <h1>hello</h1>
      <ul>
        <li key="1">Hello</li>
        <li key="2">There Different</li>
        <li>Friend</li>
      </ul>
    </div>
  );

  renderApp(elem);
}, 2000);

function renderApp(domTree, root) {
  console.log(domTree);
  if (!rootElem) {
    rootElem = createElement(domTree);
    root.appendChild(rootElem);
  }
  else {
    const updatedDom = diff(rootElem, domTree);
    console.log(updatedDom);
    patch(rootElem, updatedDom);
  }

}

function dom(type, props, ...children) {
  return h(type, props, children);
}
