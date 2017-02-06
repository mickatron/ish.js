/* global document:true */

if (!Function.prototype.bind) {

  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        return fToBind.apply(this instanceof
          function() {} && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)));
      };

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();

    return fBound;
  };
}

(function(global) {
  var ready = false;
  var sandbox = document.createElement('div');

  function setup() {
    sandbox.style.visibilty = 'hidden';
    sandbox.style.position = 'absolute';
    sandbox.style.top = '-999999px';
    sandbox.style.zIndex = '-1';
    document.body.appendChild(sandbox);
    ready = true;
  }

  global.appendToDom = function(tag, children) {
    if (!ready) setup();
    var container = document.createElement(tag);
    if (typeof children === 'string') {
      container.innerHTML = children;
    } else if (children) {
      children.forEach(function(childTag) {
        container.appendChild(document.createElement(childTag));
      });
    }
    sandbox.appendChild(container);
  };

  global.destroyDom = function() {
    if (ready) sandbox.innerHTML = '';
  };


  global.getHTML = function(url, callback) {
    //console.log(url);
    ish.ajax({
      type: 'GET',
      url: url,
      success: function(data) {
        appendToDom('section');
        ish('section')[0].innerHTML = data.toString();
        callback({
          html: data
        });
      },
      error: function() {
        callback({
          error: 'Error loading HTML fragment'
        });
      }
    });
  };

})(this);

if (typeof Object.assign !== 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    'use strict';
    if (target === null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];

      if (nextSource !== null) { // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

var noop = function() {};