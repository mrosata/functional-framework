import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import {compose} from 'ramda';


export function renderDOM(initialTemplate, root, _state = {}) {
  // In order to be able to do the dom diffing, we need to maintain
  // references to the currentTree (for comparision) and the rootNode
  let currentTree = initialTemplate(_state);
  let rootNode = createElement(currentTree);

  root.appendChild(rootNode);

  function renderApp(domTree) {
    const updatedDom = diff(currentTree, domTree);
    patch(rootNode, updatedDom);
    currentTree = domTree;
  }

  return compose(renderApp, initialTemplate);
}


export default function dom(type, props, ...children) {
  if (typeof type === "function") {
    // Pass the state into the function to get the element
    return type(props);
  }
  // Element doesn't have state (or it's already hydrated)
  return h(type, props, children);
}
