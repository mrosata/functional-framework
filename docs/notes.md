
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
