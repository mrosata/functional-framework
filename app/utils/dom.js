import h from 'virtual-dom/h';
import patch from 'virtual-dom/patch';
import diff from 'virtual-dom/diff';
import createElement from 'virtual-dom/create-element';

let rootElem;

export function renderDOM(initialTemplate, rootElement) {
  return state => {
    return renderApp(initialTemplate(state), rootElement);
  }
}

export function renderApp(domTree, root) {
  if (!rootElem) {
    rootElem = createElement(domTree);
    root.appendChild(rootElem);
    return;
  }
  const updatedDom = diff(rootElem, domTree);
  patch(rootElem, updatedDom);
}


export default function dom(type, props, ...children) {
  if (typeof type === "function") {
    // Pass the state into the function to get the element
    return type(props);
  }
  // Element doesn't have state (or it's already hydrated)
  return h(type, props, children);
}
