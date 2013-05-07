# delegate.js

[![Build Status](https://secure.travis-ci.org/necolas/delegate.js.png?branch=master)](http://travis-ci.org/necolas/delegate.js)


## Installation

Install with [Bower](http://bower.io):

```
bower install --save delegate.js
```

The component can be used as a Common JS module, an AMD module, or a global.


## API

### delegate(element)

Specify the event delegate element. Returns `delegate` to allow chaining.

### delegate#on(type, selector, callback, [capture])

Delegate the handling of an event `type` to the given ancestor-element of nodes
matching a given CSS `selector`. The `callback` function is invoked when an
event bubbles up through any nodes that delegated their event handling to the
ancestor.

The event object that is passed to the callback has a `delegateTarget` property
that corresponds to the delegator element.

```html
<div class="delegator"></div>
```

```js
delegate(document).on('click', 'div', function (e) {
    console.log(e.delegateTarget.className);
    // => 'delegator'
});
```

### delegate#once(type, selector, callback, [capture])

The same as `.on()` but the callback will be removed after it has been invoked
for the first time.

### delegate#off(type, callback, [capture])

Remove an event-type callback from the delegate element (event target).

```js
delegate(document).off('click', listener);
```


## Testing

Install [Node](http://nodejs.org) (comes with npm) and Bower.

From the repo root, install the project's development dependencies:

```
npm install
bower install
```

Testing relies on the Karma test-runner. If you'd like to use Karma to
automatically watch and re-run the test file during development, it's easiest
to globally install Karma and run it from the CLI.

```
npm install -g karma
karma start
```

To run the tests in Firefox, just once, as CI would:

```
npm test
```


## Browser support

* Google Chrome (latest)
* Opera (latest)
* Firefox 4+
* Safari 5+
* Internet Explorer 9+ (IE 8 requires a DOM3 Event shim)
