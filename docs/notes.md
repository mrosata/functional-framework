
Start up a project using Webpack
// TODO: Add instructions to setup the environment using webpack (or clone from a repo).


We'll be rendering Web Components using Pure Functions. Since web components aren't fully supported in all browsers we'll use a polyfill to make sure that our code works properly. Install the web components polyfill from the command line using Bower.
```bash
bower install webcomponents/webcomponentsjs --save
```

Then add these lines to the top of "index.html". *Taken from webcomponents.org*
```javascript
(function() {
  if ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template')) {
    // platform is good!
  } else {
    // polyfill the platform!
    var e = document.createElement('script');
    e.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
    document.body.appendChild(e);
  }
})();
```



This was my first attempt at solving the DOM issue using jsx (it works)
```javascript

const root  = get('root');
const elem  = get('element');

const body         = document.body;
const appendToBody = _appendElem(body);

const currentState = {
  name: 'Michael the Man',
  age:  32
};


root(elemComponent).appendChild( templateFn(currentState) );

appendToBody(elem(elemComponent));

function createElement(tagName, children) {
  const rootNode = document.createElement(tagName);

  children.forEach(node => {
    if (typeof node === "string" || typeof node === "number")
      rootNode.appendChild(document.createTextNode(node));
    else
      rootNode.appendChild(dom(node));
  });

  return rootNode;
}

function dom(tagName, props, ...children) {
  if (typeof tagName === "object" && tagName instanceof HTMLElement) {
    return tagName;
  }
  if (typeof tagName === "function") {
    return tagName(props);
  }

  return createElement(tagName, children);
}


const InnerTemplate = ({state: {age}}) =>  <p>I am {age} years old!</p>;


function templateFn(state) {
  return (
    <div>
      <h1>Hello there {state.name} How are you</h1>
      <p>How is <em>work</em> going?</p>
      <br/>
      <InnerTemplate state={state}/>
    </div>
  );
}

```
