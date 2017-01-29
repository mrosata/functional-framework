import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';
import {compose} from 'ramda';


/**
 * The first time a root tree is rendered it is handled with renderDOM.
 * This function will return a function that can be used to subsequently
 * update the DOM when state changes occur.
 *
 * @param treeBuilder {Function} probably JSX or Virtual-Dom function
 * @param root        {HTMLElement} parent node to insert template
 * @param _state      {Object} optional initial state
 * @returns {*}
 */
export function renderDOM(treeBuilder, root, _state = {}) {
  // In order to be able to do the dom diffing, we need to maintain
  // references to the currentTree (for comparision) and the rootNode
  let currentTree = treeBuilder(_state);
  const rootNode = createElement(currentTree);

  root.appendChild(rootNode);

  function renderApp(domTree) {
    const updatedDom = diff(currentTree, domTree);
    patch(rootNode, updatedDom);
    currentTree = domTree;
  }

  return compose(renderApp, treeBuilder);
}


export default function dom(type, props, ...children) {
  if (typeof type === "function") {
    // Pass the state into the function to get the element
    return type(props);
  }
  // Element doesn't have state (or it's already hydrated)
  return h(type, props, children);
}
