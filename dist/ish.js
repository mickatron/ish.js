/** 
 * 
 * @fileoverview 


Ish.js(Alpha) is a super tiny Javascript library with a jQuery'ish syntax. [Visit the full documentation][docs].

## Distributed files

There's two compiled files available in the dist folder.

 -   `ish.lite.min.js` is around 3KB and includes only the ish.core.js and ish.events.js methods. Minified it weighs in just under 3KB.
 -   `ish.min.js` weighs in at around 9kb and incldes all Ish.js library methods.

### Compiling a custom version

See the 'Compiling a Custom Package Tutorial'.

## Browser Support

 -   IE9+
 -   Firefox
 -   Chrome
 -   Safari

## Mobile Support
TBA

## Installation &amp; Quick Start

Install with Git, NPM or Yarn. 

    // Git
    $ git clone https://github.com/mickatron/ish.js.git
    // NPM
    $ npm i -D ish.js
    // Yarn
    $ yarn add ish.js --dev


Then include the 'dist/ish.min.js' file on your html page and you're ready to go.

    <script type="text/javascript" src="/path/to/ish.min.js">

## Core Methods

    // querySelectorAll based Selector Engine.
    ish('selector','context');
    
    // Selector Engine Utilities.
    ish('selector').nth();
    ish('selector').indexOf();
    ish('selector').forEach();
    
    // Basic Utils.
    ish('selector').attr();
    ish('selector').css();  
    ish('selector').offset();  
    ish('selector').dimension();
    
    // Event Methods.
    ish('selector').on();
    ish('selector').off();
    ish('selector').trigger();
    
    // Library Utils.
    ish.extends();

## Optional Methods
This is not a full list, please see the full [documentation][docs] for all availiable methods.

    // AJAX
    ish.ajax();
    
    // ish().dimension Abstracts
    ish('selector').width();
    ish('selector').height();
    
    // Classname Utils.
    ish('selector').hasClass();
    ish('selector').addClass();
    ish('selector').removeClass();
    
    //Responsive Util
    ish.responsive();
    //Routing
    ish.router();
    // Templating/rendering
    ish.renderTemplate()
    ish.updateTemplate()
    ish.renderBind()
    // State/Store
    ish.store
    



## Tutorials
 - [Getting Started][tut1]
 - [Compiling a custom Ish.js package][tut2]
 - (Coming soon) Using the Responsive Utility
 - (Coming soon) Using the Tween Utility

## Documentation
[Visit the full documentation][docs]

## Immediate To-dos;

 -  Error reporting.
 -  Improved Documentation and Theme   
 -  Improved testing
 -  review store/state component

 
 [docs]: http://ish.digitalfeast.com.au/js/docs
 [tut1]: http://ish.digitalfeast.com.au/js/docs/tutorial-Getting_Started.html
 [tut2]: http://ish.digitalfeast.com.au/js/docs/tutorial-Compiling_a_Custom_Package.html









 */


/**
 * @license
 * Copyright (c) 2016 Michael Hargreaves.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */




/**
 * @namespace ish
 * @description A jQuery'ish set of utility methods. There is very few methods available under this namespace, the ish('selector') will by far be the most commonly used method. You'll also find an extends method and an optional AJAX utility.
 * @example
(function($){
	// now you can use the $ sign in place of ish just as you would using jQuery.
	// Let's start by grabbing a reference to a DOM node with the selector engine
	var $element = $('selector');
	// now we'll add the attribute 'data-ish' with a property of 'true'
	$element.attr('data-ish','true');

	var obj1 = {a:'a'};
	var obj2 = {a:'new a', b:'b'};
	$.extend(obj1,obj2);
})(ish);
 */
var ish = function(document, window, $) {
	//'use strict';
	/* Lib Core
	---------------------------------------*/
	var ishObject = {},
		forEach = 'forEach',
		extend = 'extend',
		_window = window,
		_doc = document,
		dummy = document.createElement('i');
	
	
	/**
	 * Simple selector engine based on <code>querySelectorAll</code>. The usage and result is similar to <code>jQuery(selector)</code>.
	 * @name  ish
	 * @augments ishObject
	 * @function
	 * @memberof ish
	 * @param   {String|Node}   selector   A CSS Selector compatible with document.querySelectorAll or a single `Node`.
	 * @param   {ishObject|Array|NodeList|Node} context  Used to give a selector a search context.
	 * @param   {String} forceSelector    Set the ish('selector').selector paramter forcibly.
	 * @return  {ishObject}                A list of nodes with inherited library methods.
	 * @example
	 * ish('selector');
	 * //filter the collection with some context of type Node || NodeList
	 * ish('selector', Node);
	 * ish('selector', NodeList);
	 */
	var $ = function(selector, context, forceSelector) {
		context = context || document;
	
		var found;
		if (selector instanceof Node || selector === window || selector === document) {
			found = [selector];
			selector = forceSelector || selector;
		} else {
			// if context is an ishObject
			if (context.length) {
				found = [];
				var nodesFound;
				for (var i = 0; i < context.length; i++) {
					nodesFound = context[i].querySelectorAll(selector || '☺');
					// might be able to improve this....
					// https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript
					for (var el = 0; el < nodesFound.length; el++) {
						found.push(nodesFound[el]);
					}
				}
			} else {
				// querySelectorAll requires a string with a length
				// otherwise it throws an exception
				found = context.querySelectorAll(selector || '☺');
			}
		}
		var length = found.length;
		var obj = Object.create(ishObject);
	
		for (var n = 0; n < length; n++) {
			obj[n] = found[n]; // || found;
		}
	
		/**
		 * The number of items found in the collection.
		 * @memberOf ishObject
		 * @name  length
		 */
		obj.length = length;
		/**
		 * The selector string as given when calling ish(selector, context, forceSelector). This value can be overridden if using the ish() forceSelector parameter.
		 * @memberOf ishObject
		 * @name  selector
		 */
	
		obj.selector = selector;
		/**
		 * The context as given when calling ish(selector, context).
		 * @memberOf ishObject
		 * @name  context
		 */
		obj.context = context;
		return obj;
	};
	
	/**
	 * An object which stores prototype objects.
	 * @memberOf ish
	 * @name  ish.fn
	 */
	$.fn = {
		/**
		 * @mixin ish.fn.ishObject
		 * @property {Number} length 	The number of items returned in the collection.
		 * @property {Number} context 	The context item passed to the ish() selector engine.
		 * @property {String} selector 	The selector string passed to the ish() selector engine.
		 * 
		 * @description
		 * When you invoke the `ish('selector')` method `ish.fn.ishObject` members are inherited through Prototype Delegation to the returned collection.
		 * The result is just like a jQuery Object, there is utility methods, a length, context and selector property.
		 * 
		 * @example
		 * // Cache an ishObject collection
		 * var collection = ish('selector');
		 * 
		 * // Call an ishObject method
		 * ish('selector').attr('attributeName');
		 * 
		 * // There is a length property
		 * ish('selector').length; 
		 * 
		 * // and also a selector property which refers to the first parameter passed into ish();
		 * ish('selector').selector;
		 *
		 * // You can call native methods on collection items just like you would in jQuery
		 * ish('selector')[0].style.display = 'block';
		 * 
		 */
		ishObject: ishObject
	};
	
	/*
	//Returns true if it is a DOM node
	function isNode(o) {
		return (
			typeof Node === "object" ? o instanceof Node :
			o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
		);
	}
	*/
	/**
	 * Returns the item at the specified index in the `ishObject`.
	 * @name  ish.fn.ishObject.nth
	 * @function
	 * @param  {Number} int    The index of the item in the `ishObject`.
	 * @example
	 * ish('selector').nth(0); //gets the first node
	 */
	
	ishObject.nth = function(int) {
		return $(this[int], null, this.selector);
	};
	
	
	
	/**
	 * Iterates an `ishObject` returning each `Node` in an individual `ishObject`, along with its index 
	 * in the original collection. This method will iterate every item in the collection and cannot be broken.
	 * @name  ish.fn.ishObject.forEach
	 * @function
	 * @param  {Function} fn    The callback function which will be called with each iteration
	 * @param  {Object}   scope The scope in which the callback function will be called. 
	 * @return {ishObject}        Returns the `ishObject` which called it. Method is chainable. 
	 * @example
	 * ish('selector', function( $item, index ) {
	 *     //iterates the collections Dom Nodes, cannot be broken out of.    
	 * });
	 */
	ishObject[forEach] = function(fn, scope) {
		scope = scope || this;
		var i = 0,
			s,
			len = this.length;
		for (i; i < len; i++) {
			s = $(this[i], null, this.selector);
			fn.call(scope, s, i);
		}
		return this;
	};
	/**
	 * Gets the index of a specific `Node` in an `ishObject`
	 * @name  ish.fn.ishObject.indexOf
	 * @function
	 * @param  {Node} needle    The `Node` to find in the `ishObject`.
	 * @return {Number}         Index of the `Node` in the `ishObject`. Returns -1 if not found.
	 * @example
	 * ish('selector').indexOf(Node);
	 */
	ishObject.indexOf = function(needle) {
		var i = 0,
			len = this.length;
	
		for (i; i <= len; i++) {
			var item = this[i];
			if (item === needle) {
				return i;
			} else if (!item) {
				return -1;
			}
		}
		//return this;
	};
	/**
	 * Gets an attributes value for the first element in the `ishObject`. If the second argument is supplied the 
	 * method sets an attribute and its value on all `Node`'s in the given `ishObject`. Prototyped method and properties are shadowed in the new object.
	 * @name  ish.fn.ishObject.attr
	 * @function
	 * @param  {String} name        A valid CSS attribute selector.
	 * @param  {String} value       The attirbute value to be set.
	 * @return {ishObject|String}     If setting an attribute the method returns the `ishObject` which called it 
	 * and is chainable. If getting an attribute value the method will return the value found or undefined if 
	 * it's not found.
	 * @example
	 * ish('selector').attr('attribute-name'); //get an attribute value
	 * ish('selector').attr('attribute-name','attribute-value'); //set an attribute value
	 */
	ishObject.attr = function(name, value) {
		var returnVal;
		if (typeof value === "string") {
			this[forEach](function(el) {
				el[0].setAttribute(name, value);
			});
			returnVal = this;
		} else if (this[0]) {
			returnVal = this[0].getAttribute(name);
		}
		return returnVal;
	};
	
	/**
	 * Accepts a series objects, merging the second parameter into the first recursively, if more than two objects are supplied the other objects are merged into the first in the order given.
	 * @name  ish#extend
	 * @function
	 * @param  {Object} object1 An `Object` that will have values of object2 recursively merged.
	 * @param  {Object} [,obectj2] A series of `Objects` to merge into object1.
	 * @return {Object}         A merged `Object`.
	 * @example
	 * var obj1 = {a:'a',b:{ba:'ba',bb:'bb',bc:{bca:'bca'}},c:[1,2,3]};
	 * var obj2 = {d:'d',b:{ba:'ba-change',bc:{bcb:'added'}},c:[4,5,6]};
	 * ish.extend(obj1,obj2);
	 */
	
	function extendProp (targetObject, toMerge, prop){
		var propValue = toMerge[prop];
		if (propValue === null || propValue === undefined) {
			return; // skip null and undefined values
		} else if (propValue.constructor === Object || Array.isArray(propValue)) { // recurse objects that already exisit on the target
			targetObject[prop] = $[extend](targetObject[prop] || {}, propValue);
		} else {
			/*var descriptor = Object.getOwnPropertyDescriptor(targetObject, prop);
			console.log('descriptor ',prop, descriptor, (typeof descriptor !== 'undefined' && descriptor.writable === 'true'), !targetObject[prop] );
			
			if((typeof descriptor !== 'undefined' && typeof descriptor.set !== 'undefined') || !targetObject[prop]) {
				console.log('extend ',prop);
				targetObject[prop] = propValue;
			}*/
	
			targetObject[prop] = propValue;
		}
	}
	$[extend] = function() {
		var args = arguments;
		var targetObject = args[0];
		// TODO: I dont think this will copy over any constructor prototypes implementations...
		// TODO: should I consider shallow copies?
		for (var i = 1; i < args.length; i++) {
			var toMerge = args[i];
			if(Array.isArray(targetObject)){
				var newArray = [];
				for (var e = 0; e < toMerge.length; e++) {
					if (toMerge[e] === null || toMerge[e] === undefined) {
						continue; // skip null and undefined values
					} else if (toMerge[e].constructor === Object ){ 
						targetObject[e] = $[extend](targetObject[e] || {}, toMerge[e]);
					} else if ( Array.isArray( toMerge[e])) {
						targetObject[e] = $[extend](targetObject[e] || [], toMerge[e]);
					} else {
						targetObject[e]  = toMerge[e];
					}
				}
			} else if(targetObject.constructor === Object){
				// all keys incuding non-enums
				var allKeys = Object.getOwnPropertyNames(toMerge);			
				for (var prop in toMerge) {
					var keyInx = allKeys.indexOf(prop);
					allKeys.splice(keyInx, 1);
					extendProp (targetObject, toMerge, prop);
				}
				// extend any non-enumerable props left over
				for (var each = 0; each < allKeys.length; each++) {
					extendProp (targetObject, toMerge, allKeys[each]);
				}
			}
		}
		return targetObject;
	};
	
	/**
	 * Returns the left and top offset in pixels for the first element in the `ishObject`. 
	 * @name  ish.fn.ishObject.offset
	 * @function
	 * @return {Object}         An `Object` with values for left and top offsets in pixel values.
	 * @example
	 * ish('selector').offset();
	 */
	ishObject.offset = function() {
		var ol = 0;
		var ot = 0;
		if (this[0].offsetParent) {
	
			ol = this[0].offsetLeft;
			ot = this[0].offsetTop;
	
		}
		return {
			left: ol,
			top: ot
		};
	};
	
	/**
	 * Gets the width or height the first element in the supplied `ishObject`.
	 * @name  ish.fn.ishObject.dimension
	 * @function
	 * @param  {String} type          'width' or 'height'.
	 * @param  {Boolean} margins      Include margins in the return result.
	 * @param  {Boolean} excludeScrollBar Exclude the scrollbars width/height from the result.
	 * @return {Integer}              The height of the element.
	 * @example
	 * ish('selector').width();
	 */
	ishObject.dimension = function(type, margins, excludeScrollBar) {
		var disp;
		var target = this[0];
		if (this.selector !== (window || document)) {
			disp = target.style.display;
			if (disp === 'none') target.style.display = 'block';
		}
		var height = 0;
		var mt = 0;
		var mb = 0;
		if (margins) {
			mt = type === 'height' ? this.css('marginTop') : this.css('marginLeft');
			mb = type === 'height' ? this.css('marginBottom') : this.css('marginRight');
			height = parseInt(mt) + parseInt(mb);
		}
		if (target === window) {
			height += type === 'height' ? target.outerHeight : target.outerWidth;
		} else if (excludeScrollBar) {
			height += type === 'height' ? target.clientHeight : target.clientWidth;
		} else {
			height += type === 'height' ? target.offsetHeight : target.offsetWidth;
		}
		if (this.selector !== (window || document) && disp === 'none') {
			target.style.display = 'none';
		}
		return height;
	};
	
	/**
	 * Gets the CSS value of the first element in the supplied `ishObject`. Or sets the CSS value on all items in an `ishObject`.
	 * @name  ish.fn.ishObject.css
	 * @function
	 * @param  {String} prop   The name of the CSS property in camelCase. eg. 'margin-left' would be passed as 'marginLeft'.  
	 * @param  {String} value   Exclude the horizontal scrollbars height from the result.
	 * @return {ishObject}       Returns the `ishObject` which called it. Method is chainable. 
	 * @example
	 * ish('selector').css();
	 */
	ishObject.css = function(prop, value) {
		if(typeof prop === 'object') {
			for(var each in prop) {
				this.css(each, prop[each]);
			}
		} else if (!value) {
			//get the style
			var typeStr = prop;
			var lastIndex = 0;
			for(var i = 0; i < prop.length; i++) {
				var character = prop.charAt(i);
				
				if(character === character.toUpperCase()) {
					typeStr = prop.slice(lastIndex, i) + '-' + prop.slice(i).toLowerCase();
					lastIndex = i;
					break;
				}
			}
			var value = this[0].style[prop] || window.getComputedStyle(this[0]).getPropertyValue(typeStr);
			return value;
		} else {
			// set the style
			this[forEach](function($el) {
				$el[0].style[prop] = value;
			});
		}
		return this;
	};
	//=require ish.core.js
	/**
	 * Attach handlers to the Node/s in the given ishObject. This method is just a wrapper for 'addeventListener' so any valid Javascript event can be used. 
	 * It's inclusion in the library is intended to save you writing loops to cover multiple event targets when hooking events.
	 * @name  ish.fn.ishObject.on
	 * @function
	 * @param  {String}   event     The type of event you're adding to the Node/s
	 * @param  {Function} fn        A callback to be fired when the event is triggered.
	 * @param  {String}   delegate  A valid CSS selector to delegate the event to.
	 * @return {ishObject}            Method is chainable, returns the ish Object which called the method. 
	 * @example
	 * var fn = function(event) {
	 *     //mousedown event
	 * };
	 * ish('selector').on('mousedown', fn);
	 */
	
	ishObject.on = function(event, fn, delegate) {
	
		if (delegate) {
			this[forEach](function(el) {
				var node = el[0];
				var matches = node.mozMatchesSelector || node.webkitMatchesSelector || node.oMatchesSelector || node.matchesSelector || (function(delegate) {
	
					var target = node,
						elements = $(delegate),
						match = false;
					elements[forEach](function($el) {
						if ($el[0] === target) match = true;
					});
					return match;
				});
				//store an array on the node with the delgate function data.
				// we'll call on this data in the undelgate methods
				node.delegates = node.delegates || [];
				var temp = {
					f: fn,
					e: function(event) {
						if (matches.call(event.target, delegate)) {
							event.delegateTarget = this;
							fn.call(this,event);
						}
					}
				};
				node.delegates.push(temp);
				node.addEventListener(event, temp.e);
			});
		} else {
			this[forEach](function(el) {
				el[0].addEventListener(event, fn, false);
			}, this);
		}
		return this;
	};
	
	
	/**
	 * Dettach handlers to the Node/s in the given ishObject. This method is just a wrapper for 'removeEventListener' so any valid Javascript event can be used. 
	 * Its inclusion in the library is intended to save you writing loops to cover multiple event targets when hooking events.
	 * @name  ish.fn.ishObject.off
	 * @function
	 * @param  {string} event The type of event you're adding to the Node/s
	 * @param  {function} fn The Node to find in the ish Object.
	 * @return {ishObject}         Method is chainable, returns the ish Object which called the method. 
	 * @example
	 * var fn = function(event) {
	 *     //mousedown event
	 * };
	 * ish('selector').on('mousedown', mousedownHandler); //on
	 * ish('selector').off('mousedown', fn); //off
	 */
	ishObject.off = function(event, fn) {
	
		this[forEach](function(el) {
			// remove listeners from the element
			el[0].removeEventListener(event, fn, false);
			// remove any delegate listeners
			var delegates = el[0].delegates;
			// if there's delegates loop each of them
			if (delegates)
				delegates[forEach](function(evtfn, i) {
					// check for matches
					if (evtfn.f === fn) {
						el.off(event, evtfn.e);
						el[0].delegates.splice(i - 1, i);
					}
				}, this);
		});
	
		return this;
	};
	
	
	/**
	 * Triggers an event.
	 * @name  ish.fn.ishObject.trigger
	 * @function
	 * @param  {string} type The type of event to trigger.
	 * @param  {object} data Any 
	 * @return {ishObject}         Method is chainable, returns the ish Object which called the method. 
	 * @example
	 * var fn = function(event) {
	 *     //mousedown event
	 * };
	 * ish('selector').on('mousedown', fn); //on
	 * ish('selector').trigger('mousedown'); //fires mousedown
	 */
	ishObject.trigger = function(type, data) {
		this[forEach](function(el) {
			// construct an HTML event. This could have
			// been a real custom event
			var event = document.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
			event.data = data || {};
			event.eventName = type;
			//event.target = el;
			el[0].dispatchEvent(event);
	
	
			//el[trigger](event);
		});
		return this;
	};

	/* Lib Optional
	---------------------------------------*/
	/**
	 * Gets the height of the first element in the supplied `ishObject`. This method is an abstraction of `ishObject.dimension`.
	 * @name  ish.fn.ishObject.height
	 * @function
	 * @param  {Boolean} margins      Include margins in the return result.
	 * @param  {Boolean} clientHeight Exclude the horizontal scrollbars height from the result.
	 * @return {Integer}              The height of the element.
	 * @example
	 * ish('selector').height();
	 */
	ishObject.height = function(margins, clientHeight) {
		return this.dimension('height', margins, clientHeight);
	};
	/**
	 * Gets the width of the first element in the supplied `ishObject`. This method is an abstraction of `ish.fn.ishObject.dimension`.
	 * @name  ish.fn.ishObject.width
	 * @function
	 * @param  {Boolean} margins      Include margins in the return result.
	 * @param  {Boolean} clientHeight Exclude the horizontal scrollbars height from the result.
	 * @return {Integer}              The height of the element.
	 * @example
	 * ish('selector').width();
	 */
	ishObject.width = function(margins, clientWidth) {
		return this.dimension('width', margins, clientWidth);
	};
	/**
	 * Make an XHR request. The implementation is currently very basic, the response is not parsed as JSON or converted to a String, you will have to do that to the response manually when it's returned. 
	 * @name  ajax
	 * @function
	 * @memberof ish
	 * @param  {Object} options
	 * @param  {String} options.type Acceptable values are; 'GET','POST','PUT','DELETE'.
	 * @param  {String} options.url  The url of the request.
	 * @param  {Function} options.success A callback function triggered when the ajax call is successful. The responseText is passed as the first parameter of the function, other values are availiable from the XMLHttpRequest Object returned from this component.
	 * @param  {Function} options.error  A callback function triggered if the ajax call is unsuccessful.
	 * @param  {Object} options.data A custom data object to pass with the request.
	 * @param  {Object} options.headers An Object with String key values representing the header and its values. You can add custom header values here. 
	 * @param  {String} options.headers.Accept By default the Accept header is ommited although it is a common one to set so it gains a mention here. Common values are: `"text/plain"`, `"text/html"`, `"application/xml, text/xml"`, `"application/json, text/javascript"`
	 * @param  {String} options.headers.Content-Type Default value is `'application/x-www-form-urlencoded'` other values often used are: `'text/plain'`, `'multipart/form-data'`, `'application/json'` or `'text/xml'`.
	 * @param  {String} options.headers.X-Requested-With Default value is 'XMLHttpRequest'.
	 * @return {ish}     Returns the XMLHttpRequest Object.
	 * @example
	 * var reqSuccess = function(data){
	 * 	//success
	 * 	console.log('success', data, req);
	 * };
	 * var reqError = function(statusText, status){
	 * 	//error
	 * 	console.log('There was an error. '+status+' : '+statusText, req);
	 * };
	 * 
	 * var req = ish.ajax({
	 * 	type:'JSON',
	 * 	url: 'http://domain.com/ajaxhandler',
	 * 	success: reqSuccess,
	 * 	error: reqError,
	 * 	data: {"JSON":"data"}
	 * });
	 */
	$.ajax = function(options) {
	
		var settings = $.extend({
			type: 'GET', // PUT OR JSON, GET, POST
			url: '',
			success: null,
			error: null,
			data: '',
			headers: {
				"X-Requested-With": 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}, options);
	
		var xhr = new XMLHttpRequest();
		xhr.open(settings.type, encodeURI(settings.url));
	
		var _successFn = settings.success;
		var _errorFn = settings.error;
		// SET REQUEST HEADERS
		var _headers = settings.headers;
		for ( var prop in _headers ) {
			xhr.setRequestHeader(prop, _headers[prop]);
		}
		// Listen to ONLOAD EVENT
		xhr.onload = function() {
			if (xhr.status === 200) {
				if(_successFn) _successFn( xhr.responseText );
			} else {
				if(_errorFn) _errorFn( xhr.statusText, xhr.status );
			}
		};
	
		xhr.send(settings.data);
		return xhr; // Theres no publics so just return the xhr obj.
	};
	//=require ish.core.js
	
	var hasClass = 'hasClass',
		addClass = 'addClass',
		removeClass = 'removeClass';
	
	/**
	 * Tests if a particular class name is found on a Node within the given ishObject. 
	 * This method will check the whole collection, if you want to check a specific 
	 * selector you will be required to filter the collection before making the check.
	 * @name ish.fn.ishObject.hasClass
	 * @function
	 * @param  {String} test 	The class name to test against the collection.
	 * @return {boolean}      	If the class name was found on the collection.
	 * @example
	 * ish('selector').hasClass('className');
	 */
	ishObject[hasClass] = function(test) {
		var found = false;
		this[forEach](function(el) {
			if (RegExp(' ' + test + ' ').test(' ' + el[0].className + ' ')) {
				found = true;
			}
		});
		return found;
	};
	
	/**
	 * Removes a class name from each Node in the given ishObject.
	 * @name ish.fn.ishObject.removeClass
	 * @function
	 * @param  {String} name 	The class name you wish to remove from the element/s. 
	 * @return {ishObject}      Returns the `ishObject` which called it. Method is chainable. 
	 * @example
	 * ish('selector').removeClass('className');
	 */
	ishObject[removeClass] = function(name) {
		this[forEach](function(el) {
			if (el.hasClass(name)) {
				var newClass = ' ' + el[0].className.replace(/[\t\r\n]/g, ' ') + ' ';
				while (newClass.indexOf(' ' + name + ' ') >= 0) {
					newClass = newClass.replace(' ' + name + ' ', ' ');
				}
				el[0].className = newClass.replace(/^\s+|\s+$/g, '');
			}
		});
		return this;
	};
	
	/**
	 * Adds a class name to each Node in the given ishObject.
	 * @name ish.fn.ishObject.addClass
	 * @function
	 * @param  {string} name 	The class name you wish to add to the element/s. 
	 * @return {ishObject}      Returns the `ishObject` which called it. Method is chainable. 
	 * @example
	 * ish('selector').addClass('className');
	 */
	ishObject[addClass] = function(name) {
		this[forEach](function(el) {
			if (!el.hasClass(name)) {
				el[0].className += ' ' + name; // just adding a space to the start of every name saves a little code and makes little difference in HTML.
			}
		});
		return this;
	};
	//!=include /js/ish.invoke.js // Deprecated, extra optional. needs removal before beta

	/* Lib Optional Components
	---------------------------------------*/
	//!=include /js/ish.easing.js // just if you really need them
	
	$.fn.emitter = {
		log: [],
		/**
		 * Emit an action or data to subcribers.
		 * @memberOf ish.emitter
		 * @param  {String}   type The name of the emission.
		 * @param  {Object} argsObject   An Object of data to be passed with the emission.
		 * @return {$.emitter} Chainable.        
		 */
		emit: function(type, argsObject){
			var listeners = this.listeners[type];
			if(!listeners) return this;
			for (var handler in listeners) {
				listeners[handler].call(this, argsObject);
			}
			if($.fn.emitter.log !== false) $.fn.emitter.log.push({type: type, arguments: argsObject });
			return this;
		},
		/**
		 * Subcribe from an a specific emission.
		 * @memberOf ish.emitter
		 * @param  {String}   type The name of the emission type you are subscribing.
		 * @param  {Function} fn   The function that you are subscribing.
		 * @return {$.emitter} Chainable.        
		 */
		subscribe: function(type, fn){
			this.listeners[type] = this.listeners[type] || [];
			this.listeners[type].push(fn);
			return this;
		},
		/**
		 * Unsubcribe from an a specific emission.
		 * @memberOf ish.emitter
		 * @param  {String}   type The name of the emission type you are unsubscribing.
		 * @param  {Function} fn   The function that you are unsubscribing.
		 * @return {$.emitter} Chainable.        
		 */
		unsubscribe: function(type, fn){
			var listeners = this.listeners[type];
			if(listeners){
				var index = listeners.indexOf(fn);
				listeners.splice(index, 1);
			}		
			return this;
		},
		/**
		 * Remove all subscribers from the emitter instance.
		 * @memberOf ish.emitter
		 * @return {$.emitter} Chainable.        
		 */
		flush : function(){
			this.listeners = {};
			return this;
		}
	};
	/**
	 * A basic emitter factory.
	 * @name  ish.emitter
	 * @constructor
	 * @return {emitter} An instance of the $.emitter
	 */
	$.emitter = function(){
		var factory = Object.create($.fn.emitter);
		factory.listeners = {};
		return factory;
	};
	//=require ish.core.js
	(function() {
		var _settings = [];
		var _state = [];
		var _windowWidth;
		var _windowHeight;
	
		// PRIVATES
		var onResizeFn = function(evt) {
			//_windowWidth
			setState();
		};
	
		var setState = function() {
			_windowWidth = window.innerWidth;
			_windowHeight = window.innerHeight;
	
			_settings.forEach(function(el, i) {
				var tempState;
				var tempValueType; //width = 0 || height = 1
				el.breakpoints.forEach(function(obj, i) {
					var name = obj.name;
					var _widthValue = obj.width;
					var _heightValue = obj.height;
					el.state = el.state || [];
					var widthTest = !isNaN(_widthValue) && _windowWidth > _widthValue;
					var heightTest = !isNaN(_heightValue) && _windowHeight > _heightValue;
	
					if (widthTest) {
						tempState = name;
						tempValueType = 0;
					} else if (heightTest) {
						tempState = name;
						tempValueType = 1;
					}				
				});
					
				if (tempState && 
					tempValueType !== null && 
					el.state[tempValueType] !== tempState || 
					tempState === '') {
					
					el.state[tempValueType] = tempState;
	
					/**
					 * An event/action emitted by ish.emitter.
					 * @memberOf ish.responsive
					 * @event onMediaBreak
					 * @property {String} name The name of the breakpoint as defined in the options object.
					 * @example
					 * mediaBreaks.subscribe('onMediaBreak', function(data){
					 * 		console.log('Media break: ',data.name);
					 * });
					 */
					el._this.break = el.state[tempValueType];
					el._this.emit('onMediaBreak', { name: el.state[tempValueType] } );
				}
			});
		};
		// EXPOSED PROTOTYPE
		$.fn.responsive = {
			/**
			 * Add one or more breakpoints to the instance.
			 * @param {Array} settings An Array containing breakpoint settings.
			 * @return {ish.responsive}       Chainable, returns its own instance.
		 	 * @memberOf ish.responsive
			 */
			add : function(settings) {
				_settings.push(settings);
				setState();
				return this;
			},
			/**
			 * Remove one or more breakpoint object from the instance.
			 * @param {Array} settings  An Array containing breakpoint settings.
			 * @return {ish.responsive}       Chainable, returns its own instance.
			 * @memberOf ish.responsive
			 */
			remove : function(settings) {
				_settings.forEach(function(el, i) {
					if (el === settings) _settings.splice(i, 1);
				});
				return this;
			}
		};
		// set initial state and event handler
		setState();
		$(window).on('resize', onResizeFn);
	})();
	
	
	/**
	 * Calls an event when breakpoints are reached. Needs a prototypal review.
	 * @name  ish.responsive
	 * @constructor
	 * @extends {ish.emitter}
	 * @fires onMediaBreak
	 * @param {object} options
	 * @param {Array} options.breakpoints An Array of Objects where the key is the name of the breakpoint and the value is the value that breakpoint will be triggered.
	 * @param {string} options.eventPrefix The prefix or namespace events will be called under. 
	 * @return {ish.responsive} The Responsive instances public API.
	 * @example
	var mediaBreaks = ish.responsive({
		breakpoints: [{
			name: 'mobile',
			width: 0
		}, {
			name: 'tablet',
			width: 640
		}, {
			name: 'desktop',
			width: 1024
		}],
		eventPrefix: 'ish.responsive'
	});
	mediaBreaks.subscribe('onMediaBreak', function(data){
		console.log('Media break: ',data.name);
	});
	 */
	
	$.responsive = function(options) {
	
		var responsiveObj = Object.create($.fn.responsive);
		ish.extend(responsiveObj, ish.emitter());
	
		var _settings = $.extend({
				_this: responsiveObj,
				breakpoints: [{
					name: 'mobile',
					width: 0
				}, {
					name: 'tablet',
					width: 640
				}, {
					name: 'desktop',
					width: 1024
				}],
				eventPrefix: 'ish.responsive'
			},
			options || {});
	
		/**
		 * Removes all breakpoints for the instance and returns null. We cannot destroy the module internally, but you can use the return value to null out your references if you wish. 
		 * @name  destroy
		 * @memberOf ish.responsive
		 * @return {null} Returns null;
		 * @example
		 * mediaBreaks.destroy();
		 * 
		 */
		responsiveObj.destroy = function() {
			responsiveObj.remove(_settings);
			return null;
		};
	
		responsiveObj.add(_settings);
		
		return responsiveObj;
	};
   
    /* Lib Optional Components -- Application Development
    ---------------------------------------*/
	/**
	 * Resolves an Object path given in String format within the given Object.
	 * @name  ish.resolveObjectPath
	 * @function
	 * @param  {Object} object      The object which contains the value you're attempting to resolve.
	 * @param  {String} pathString  The path of the value which you are attempting to resolve.  
	 * @return {Object}             The resolved value.
	 * @example
	 *
	 * var object = {
	 *     nested: {
	 *         value : 'a nested value',
	 *         array: [1,2,'third',4,5]
	 *     }
	 * };
	 * 
	 * var value = ish.resolveObjectPath(object, 'nested.value'); // 'a nested value'
	 * var arrayValue = ish.resolveObjectPath(object, 'nested.array[3]'); // 'third' 
	 * 
	 */
	$.resolveObjectPath = function(o, s) {
	    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	    s = s.replace(/^\./, '');           // strip a leading dot
	    var a = s.split('.');
	    for (var i = 0, n = a.length; i < n; ++i) {
	        var k = a[i];
	        if (k in o) {
	            o = o[k];
	        } else {
	            return;
	        }
	    }
	    return o;
	};
	
	/**
	 * Sets an the value of an Object path given in String format within the given Object.
	 * @name  ish.setPathByString
	 * @function
	 * @param  {Object} object      The object which contains the value you're attempting to set.
	 * @param  {String} pathString  The path of the value which you are attempting to set.
	 * @param  {value} value        The value you're attempting to set.
	 * @return {Object}             The resolved value.
	 * @example
	 *
	 * var object = { 
	 *     nested: { 
	 *         value : 'a nested value',
	 *         array: [1,2,'third',4,5]
	 *     }
	 * };
	 * 
	 * var value = ish.resolveObjectPath(object, 'nested.value'); // 'a nested value'
	 * var arrayValue = ish.resolveObjectPath(object, 'nested.array[3]'); // 'third' 
	 * 
	 */
	$.setPathByString = function(object, propertyString, value){
	    //propertyString = propertyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
	    //propertyString = propertyString.replace(/^\./, '');           // strip a leading dot
	    var props = propertyString.split('.');
	    var obj = object;
	    for (var i = 0; i < props.length; i++) {
	        if( i === props.length -1) {
	            obj[props[i]] = value;
	            return obj[props[i]];
	        }
	        if(!obj[props[i]]) {
	            obj[props[i]] = {};
	        } 
	        obj = obj[props[i]];
	    }
	};
	
	
	/**
	 * A state and data store.
	 * @name ish.store
	 * @namespace
	 * @type {Object}
	 */
	$.store = {
		data: {},
		states: {},
		/**
		 * Flush the store of all data and state.
		 * @memberOf ish.store
		 * @return {$.store} Chainable.
		 */
		flush: function(){
			this.states = {};
			this.data = {};
			return this;
		},
		/**
		 * Create a data object in the store.
		 * @memberOf ish.store
		 * @param  {String}   name The name of the data object to create.
		 * @param  {Function} fn   The initialization function containing actions etc...
		 * @return {Object}        The created data object.
		 */
		createDataState: function(name, fn){
			var ref = this.data[name] = $.emitter();
			ref.actions = {};
			ref.store = null;
			ref.model = null; 
			fn.call(ref);
			return ref;
		},
		/**
		 * Create a state object in the store.
		 * @memberOf ish.store
		 * @param  {String}   name The name of the state object to create.
		 * @param  {Function} fn   The initialization function containing actions etc...
		 * @return {Object}        The created state object.
		 */
		createComState: function(name, fn){
			if(typeof name === 'string' ){
				if(!this.states[name]) {
					this.states[name] = [];
				}
				var ref = $.emitter();
				ref.actions = {};
				fn.call(ref);
				this.states[name].push(ref);
				return ref;
			} else {
				fn.call(name);
				return name;
			}
		}
	};
	
	/**
	 * The name of the HTML attribute used to specify bindings.
	 * @memberOf ish
	 * @name bindAttrName
	 * @type {String}
	 */
	var bindAttrName = $.bindAttrName = "ish-bind";
	var noop = document.createElement('div');
	
	/**
	 * Render a template string with corresponding object data.
	 * @name  ish.renderTemplate
	 * @function
	 * @param  {String}   templateString 	A valid HTML template string.
	 * @param  {Object}   dataObject 		An object whose values will be bound to the rendered HTML.
	 * @return {Node}         The rendered HTML template `Node` which can be inserted into the DOM.
	 * @example
	 *
	 * var template = '<div><p ish-bind="textContent:text"></p></div>'
	 * 
	 * ish.renderTemplate(template, {text: 'Text has been rendered.'});
	 */
	$.renderTemplate = function (templateString, dataObject){
		noop.insertAdjacentHTML('afterbegin', templateString);
		var nodesToBind = $('['+bindAttrName+']',noop);
		nodesToBind.forEach(function(node){
			$.renderBind(node, dataObject);
		});
		var rendered = noop.removeChild(noop.firstChild);
		return rendered;
	};
	
	/**
	 * Update a template Node with a corresponding object data.
	 * @name  ish.updateTemplate
	 * @function
	 * @param  {Node}     updateNode 	The node to update, all child Node's will be updated.
	 * @param  {Object}   updateObject 	An object whose values will be updated in the provided HTML.
	 * @return {ish}       
	 * @example
	 *
	 * var template = '<div><p ish-bind="textContent:text"></p></div>';
	 * var renderedTemplate = ish.renderTemplate();
	 * ish.updateTemplate(renderedTemplate, {});
	 */
	$.updateTemplate = function (updateNode, updates){
		// TODO refactor, should sit outside of this fn
		var updateTemplateEachFn = function(node){ $.renderBind(node, updates); };
		for(var each in updates) {
			$('['+bindAttrName+'*="'+each+'"]', updateNode).forEach(updateTemplateEachFn);
		}
		return $;
	};
	
	/**
	 * Render the values given in the dataObject to a single node.
	 * @name  ish.renderBind
	 * @function
	 * @param  {String}   domNode 		An exisiting DOM Node.
	 * @param  {Object}   dataObject 	An object whose values will be bound to the rendered HTML.
	 * @return {Node}     The rendered HTML template `Node` which can be inserted into the DOM.
	 * @example
	 *
	 * var template = '<p ish-bind="textContent:text"></p>'
	 * var node = ish.renderTemplate(template, {text:'text has been rendered'});
	 * // you would usualy use ish.updateTemplate, this is just for exmaple
	 * ish.renderBind(node, {text: 'text has been updated text'});
	 */
	$.renderBind = function (domNode, obj) {    
	    var binds = domNode.attr(bindAttrName).split(" ");
	    for (var i = 0; i < binds.length; i++) {
			var bind = binds[i].split(":");
		    var domAttribute = bind[0].trim(); // the attribute on the DOM element
		    var propertyAttribute = bind[1].trim(); // the attribute the object
		    var targetValue = domNode[0][domAttribute];
		    var resolvedPathValue = $.resolveObjectPath(obj, propertyAttribute);
		    if(resolvedPathValue && targetValue !== resolvedPathValue) domNode[0][domAttribute] =  resolvedPathValue;
	    }
	};
	
	/**
	 * Whilst the ish.renderBind method renders values to the DOM, ish.bindToObject sets the values of the binds DOM attributes in the target object.
	 * @name  ish.bindToObject
	 * @function
	 * @param  {String}   domNode 		An exisiting DOM Node.
	 * @param  {Object}   dataObject 	An object whose values will be bound to the rendered HTML.
	 * @return {ish}      Chainable with other ish methods.
	 * @example
	 *
	 * var template = '<p ish-bind="textContent:text"></p>'
	 * var node = ish.renderTemplate(template, {text:'text has been rendered'});
	 * // you would usualy use ish.updateTemplate, this is just for exmaple
	 * ish.renderBind(node, {text: 'text has been updated text'});
	 */
	$.bindToObject = function (domNode, obj){
	    var binds = domNode.attr(bindAttrName).split(" ");
		for (var i = 0; i < binds.length; i++) {
			var bind = binds[i].split(":");
		    var domAttribute = bind[0].trim(); // the attribute on the DOM element
		    var propertyAttribute = bind[1].trim(); // the attribute the object
		    var targetValue = domNode[0][domAttribute];
		    if(targetValue) $.setPathByString(obj, propertyAttribute, targetValue);
		}
		return this;
	};
	// TODO: catch refreshes?.?.?
	// TODO: 
	
	(function(){
		var _historyAPI = window.history;
	
		function arrayFindString(str, strArray) {
			var matches = {
				values:[],
				index:[]
			};
		    for (var j=0; j<strArray.length; j++) {
		        if (strArray[j].match(str)) {
		        	matches.index.push(j);
		        	matches.values.push(strArray[j]);
		        }
		    }
		    if(matches.index.length) return matches;
		    return -1;
		}
	
		function callRouteFn(routeKey, slugs, stateData) {
			var routes = this.routes;
			if( routes.before ) routes.before( stateData );
			routes[routeKey].enter(slugs, stateData);
			if( routes.after ) routes.after( stateData );
		}
	
		// TODO: split this up in smaller more specific tasks - it's too large
		function parseURLroute (routeString, stateData){
			routeString = routeString || '';
			// get all the route keys
			var keys = Object.keys(this.routes);
			var routeKeys = [];
			var wildcardKeys = keys.filter(function(item){  
				if(item.substr(item.length -1) === '*') {
					return true;
				} else {
					routeKeys.push(item);
					return false;
				}
			});
	
			// test exact routes
			var exact = routeKeys.indexOf(routeString);
			var routeKey;
	
			if(exact >= 0) {
				routeKey =  routeKeys[exact];
			} else {
				// not exact
				var routeArray = routeString.split('/');
				routeArray.shift();
				var matches = arrayFindString(routeArray[0], routeKeys);
				var fnIndexMatches = matches.index;
				var fnKeyMatches = matches.values;
				
				// if theres more than one match refine by string comparison
				if(fnIndexMatches && fnIndexMatches.length > 1){
					var refineMatch = {
						index:[],
						values:[]
					}; 
					var mostPoints = 0;
					var mostSimilar;
					for (var i = 0; i < fnKeyMatches.length; i++) {
						var newArr = fnKeyMatches[i].split('/');
						newArr.shift();
						var points = 0;
						if( newArr.length === routeArray.length){
							for (var val = 0; val < newArr.length; val++) {
								if(newArr[val] === routeArray[val]){
									points++;
								}
								if(points > mostPoints) {
									mostPoints = points;
									mostSimilar = i;
								}
							}
						}
					}
					if(matches.index[mostSimilar]){
						refineMatch.index.push(matches.index[mostSimilar]);
						refineMatch.values.push(matches.values[mostSimilar]);
					}
					matches = refineMatch;
				}
				//console.log( 'routeString  ', routeString, matches);
				// only 1  match should exisit in the matches object by now.
				if(matches !== -1){
					if (matches.index.length === 0) { 
						this.routes.notFound(routeString);
						this.emit('ROUTE_NOT_FOUND', { route: routeString });
						return; 
					} else if (matches.index.length > 1) { 
						console.error('More than 1 route found'); 
					}
	
					// set the current slugs and the routeKey to call
					this.slugs = getSlugs(matches, routeArray); 
					routeKey = matches.values[0];
				}
			}
	
			
			
			if(this.current){
				// call previous onLeave handler
				var routeFnObj = this.routes[this.current];
				if(routeFnObj && routeFnObj.leave) routeFnObj.leave();
				// call previous onLeave handler for wildcards
				for (var e = 0; e < wildcardKeys.length; e++) {
					if(this.current.indexOf( wildcardKeys[e].replace('*','') ) === 0 ){
						var leaveFn = this.routes[ wildcardKeys[e] ].leave;
						if(leaveFn) leaveFn();
					}
				}
			}
			var returnVal;
			// test and call wildcards
			for (var d = 0; d < wildcardKeys.length; d++) {
				if(routeString.indexOf( wildcardKeys[d].replace('*','') ) === 0 ){
					callRouteFn.call(this, wildcardKeys[d], this.slugs, stateData);
					returnVal =  {route: wildcardKeys[d], previousRoute: this.current, slugs: this.slugs };
				}
			}
	
			if(routeKey){
				// call the single route found in the first tests
				callRouteFn.call(this, routeKey, this.slugs||null, stateData);
				returnVal =  {route: routeString, previousRoute: this.current, slugs: this.slugs };
			}
			this.current = routeString;
			return returnVal;
		}
		
	
		function getSlugs(matches, routeArray){
			var hasSlugs = false;
			// get any slug values 
			var splitMatchArray = matches.values[0].split('/');
			splitMatchArray.shift();
			//find slugs
			var slugs = {};
			for (var match = 1; match < splitMatchArray.length; match++) {
				// is it a slug? 
				var isSlug = splitMatchArray[match].charAt(0) + splitMatchArray[match].charAt(splitMatchArray[match].length-1);
				if(isSlug === '{}') {
					hasSlugs = true;
					// it's a slug!
					var slugName =  splitMatchArray[match].slice(1,-1);
					var slugValue = routeArray[match];
					slugs[slugName] = slugValue;
				}
			}
			return hasSlugs ? slugs : null;
		}
	
		function setState() {
			// store the state datat in localStorage, history.state has a 640kB limit.
			var stateString = JSON.stringify({data:$.store.data, states: $.store.states});
			localStorage.setItem(this.current, stateString);
		}
	
		$.fn.router = {
			/**
			 * Add a route to the router instance.
			 * @memberOf ish.router
			 * @param {String}   route The route path you're adding.
			 * @param {Object} fn    The routing object conatining 'enter' and 'leave' functions keyed by their respective name.
			 * @return {ish.router}       Chainable, returns its own instance.
			 */
			addRoute: function(route, fn){
				this.routes[route] = fn;
				return this;
			},
			/**
			 * Remove a route from the router instance.
			 * @param {String}   route The route path to remove.
			 * @return {ish.router}       Chainable, returns its own instance.
			 */
			removeRoute: function(route){
				delete this.routes[route];
				return this;
			},
			/**
			 * Flush/remove all routes from the router instance.
			 * @return {ish.router}       Chainable, returns its own instance.
			 */
			flushRoutes: function(){
				this.routes = {};
				return this;
			},
			/**
			 * Navigate to the specified route path.
			 * @param {String}   route The route path to remove.
			 * @return {ish.router}       Chainable, returns its own instance.
			 */
			navigate: function(route){
				setState.call(this); // set state of the current page
				var routeData = parseURLroute.call(this, route); // parse url route and switch pages
				_historyAPI.pushState(routeData, '', this.current);
				this.emit('ON_NAVIGATE', routeData);
				return this;
			},
			/**
			 * Destroy the router instance.
			 * @return {null}   
			 */
			destroy: function(){
				$(window).off('popstate', this.popHandler);
				return null;
			}
		};
	
		var popHandler = function(evt){
			setState.call(this);
			//get state
			var route;
			var stateData;
			if (history.state){
				var historyState = history.state;
				stateData = JSON.parse(localStorage.getItem(historyState.route));
				route = parseURLroute.call(this, historyState.route, stateData);
			} else {
				currentLocation = document.URL.replace(this.baseURL,'');
				route = parseURLroute.call(this, currentLocation);
			}
			this.emit('ON_POP', route);
			return stateData;
		};
	
		/**
		 * An application router.
		 * @name  ish.router
		 * @constructor
		 * @extends {ish.emitter}
		 * @param  {Object} options The utilities options object.
		 * @param  {String} options.baseURL The base URL of the application.
		 * @param  {Object} options.routes The routing object.
		 * @return {$.router}         The router instance
		 *
		 * @example
		 * var router = ish.router({ 
		 *		baseURL: 'http://ish.stateful.local',
		 *		routes: {
		 *			notFound: function(url){
		 *			},
		 *			before: function(history){
		 *			
		 *			},
		 *			after: function(history){
		 *			
		 *			},
		 *			'/':  {
		 *				enter: function(slugs, history){
		 *
		 *				},
		 *				leave: function(slugs, history){
		 *				}
		 *			}
		 *		}
		 * };
		 */
		$.router = function(options){
			var factory = Object.create($.fn.router);
			 factory = ish.extend({}, ish.emitter(), factory, options);
			var currentLocation = document.URL.replace(factory.baseURL,'');
			//console.log('currentLocation ',currentLocation,factory.baseURL);
			factory.popHandler = popHandler.bind(factory);
			$(window).on('popstate', factory.popHandler);
			//parses the inital route
			parseURLroute.call(factory, currentLocation);
			// add history state for the current page
			_historyAPI.replaceState({route: factory.current, slugs: factory.slugs }, "", factory.current);
			return factory;
		};
	
	})();
	


    return $;
}(document, this); 