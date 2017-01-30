/** 
 * 
 * @author Michael Hargreaves <code@digitalfeast.com.au>
 * @version 0.0.1 (alpha)
 * @license MIT
 *
 * @fileoverview 


Ish.js is a super tiny Javascript library with a jQuery'ish syntax. [Visit the full documentation][docs].

## Distributed files

There's two compiled files available in the dist folder.

 -   `ish.lite.min.js` is around 3KB and includes only the ish.core.js and ish.events.js methods. Minified it weighs in just under 3KB.
 -   `ish.min.js` weighs in at around 8kb and incldes all Ish.js library methods.

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

Install with Git, Bower or NPM. 

    // Git
    $ git clone https://github.com/mickatron/ish.js.git
    // Bower
    //Coming Soon
    // NPM
    //Coming Soon

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

    // AJAX
    ish.ajax();
    
    // ish().dimension Abstracts
    ish('selector').width();
    ish('selector').height();
    
    // Classname Utils.
    ish('selector').hasClass();
    ish('selector').addClass();
    ish('selector').removeClass();
    
    // Watchable Object
    $.watchable(Object);
    // observable Object and Array
    $.observable();

## Tutorials
 - [Getting Started][tut1]
 - [Compiling a custom Ish.js package][tut2]
 - (Coming soon) Using the Responsive Utility
 - (Coming soon) Using the Tween Utility

## Documentation
[Visit the full documentation][docs].

## Immediate To-dos;

 -  Error reporting.
 -  Improved Documentation and Theme   
 -  Improved testing
 -  A few todo's listed in the responsive component

 
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
	'use strict';
	/* Lib Core
	---------------------------------------*/
	/**
	 * @mixin ishObject
	 * @description
	 * When you invoke the `ish('selector')` method `ishObject` members are inherited through Prototype Delegation to the returned collection.
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
	var ishObject = {},
		forEach = 'forEach',
		extend = 'extend',
		_window = window,
		_doc = document,
		dummy = document.createElement('i');
	
	
	
	// Node and ishObject selector context supported. 
	
	/**
	 * Simple selector engine based on <code>querySelectorAll</code>. The usage and result is similar to <code>jQuery(selector)</code>.
	 * @name  ish
	 * @augments ishObject
	 * @function
	 * @memberof ish
	 * @param   {String|Node}   selector   A CSS Selector compatible with document.querySelectorAll or a single `Node`.
	 * @param   {ishObject|Array|NodeList} context  Used to give a selector a search context.
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
		if (isNode(selector) || selector === window || selector === document) {
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
			obj[n] = found[n] || found;
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
		ishObject: ishObject
	};
	
	//Returns true if it is a DOM node
	function isNode(o) {
		return (
			typeof Node === "object" ? o instanceof Node :
			o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
		);
	}
	
	/**
	 * Returns the item at the specified index in the `ishObject`.
	 * @name  ishObject.nth
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
	 * @name  ishObject.forEach
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
	 * @name  ishObject.indexOf
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
	 * method sets an attribute and its value on all `Node`'s in the given `ishObject`.
	 * @name  ishObject.attr
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
	$[extend] = function() {
		var args = arguments;
		var newObj = args[0];
		var length = args.length;
	
		for (var i = 1; i < length; i++) {
			for (var prop in args[i]) {
				var objProp = args[i][prop];
				// Property in destination object set; update its value.
				if (objProp === null || objProp === undefined) {
					continue;
				} else if (objProp.constructor === Object) {
					newObj[prop] = $[extend](newObj[prop] || {}, objProp);
				} else {
					newObj[prop] = objProp;
				}
			}
		}
		return newObj;
	};
	
	/**
	 * Returns the left and top offset in pixels for the first element in the `ishObject`. 
	 * @name  ishObject.offset
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
	 * @name  ishObject.dimension
	 * @function
	 * @param  {String} type          'width' or 'height'.
	 * @param  {Boolean} margins      Include margins in the return result.
	 * @param  {Boolean} clientHeight Exclude the horizontal scrollbars height from the result.
	 * @return {Integer}              The height of the element.
	 * @example
	 * ish('selector').width();
	 */
	ishObject.dimension = function(type, margins, clientHeight) {
		var disp;
		if (this.selector !== (window || document)) {
			disp = this[0].style.display;
			if (disp === 'none') this[0].style.display = 'block';
		}
		var height = 0;
		var mt = 0;
		var mb = 0;
		if (margins) {
			mt = type === 'height' ? this.css('marginTop') : this.css('marginLeft');
			mb = type === 'height' ? this.css('marginBottom') : this.css('marginRight');
			height = mt + mb;
		}
	
		if (this[0] === window) {
			height += type === 'height' ? this[0].outerHeight : this[0].outerWidth;
		} else if (clientHeight) {
			height += type === 'height' ? this[0].clientHeight : this[0].clientWidth;
			//this[0].style.display = '';
		} else {
			height += type === 'height' ? this[0].offsetHeight : this[0].offsetWidth;
	
		}
		if (this.selector !== (window || document))
			if (disp === 'none') this[0].style.display = 'none';
		return height;
	};
	
	/**
	 * Gets the CSS value of the first element in the supplied `ishObject`. Or sets the CSS value on all items in an `ishObject`.
	 * @name  ishObject.css
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
			var typeStr = prop.slice(0, 6) + '-' + prop.slice(6).toLowerCase();
			return parseInt(this[0].style[prop] || window.getComputedStyle(this[0]).getPropertyValue(typeStr));
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
							fn(event);
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
	 * @name  ishObject.height
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
	 * Gets the width of the first element in the supplied `ishObject`. This method is an abstraction of `ishObject.dimension`.
	 * @name  ishObject.width
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
	 * @name ishObject.hasClass
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
	 * @name ishObject.removeClass
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
	 * @name ishObject.addClass
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
	/**
	 * A deprecated factory helper function. Not included in any default dist, compile your own if you wish to use. This will be removed before official beta release.
	 * @function
	 * @name  ishObject.invoke
	 * @param {Object} module    The module or components function body.
	 * @param {Object} options   The module or components options Object.
	 * @param {Object} context   An Object context to invoke/execute the module or component upon.
	 * @return {Object}          Each instance in referenced by number in the order they were invoked.
	 * @example
	 * // basic usage, no options, context or parentObject used
	 * ish('selector').invoke(function($element, options) {
	 * 		//The module code body
	 * },{options},null);
	 * 
	 */
	ishObject.invoke = function(module, options, context) {
		options = options || {};
		var createdModules = {}; // could/should this be an array?
		options.selector = this.selector;
		this.forEach(function($el, i) {
			var currContext = context || {};
			options.node = $el[0];
			createdModules[i] = module.call(currContext, options, $el[0], options.selector);
		});
		return createdModules;
	};

	/* Lib Optional Components
	---------------------------------------*/
	//!=require /js/ish.easing.js // just if you really need them
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
					 * @memberOf ish.responsive
					 * @event ish.responsive.onBreakpoint
					 * @property {String} name The name of the breakpoint as defined in the options object.
					 */
					$(window).trigger(el.eventPrefix + '.onBreakpoint', {
						name: el.state[tempValueType]
					});
				}
			});
		};
		// EXPOSED PROTOTYPE
		$.fn.responsive = {
			add : function(settings) {
				_settings.push(settings);
				setState();
				return this;
			},
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
	 * @fires ish.responsive.onBreakpoint
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
	 ish(window).on('ish.responsive.onBreakpoint', function(evt){
		console.log('breakpoint event: ',evt.data.name,evt);
	 });
	 */
	
	$.responsive = function(options) {
	
		var responsiveObj = Object.create($.fn.responsive);
	
		var _settings = $.extend({
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
		 * @memberOf ish.responsive
		 * @return {null} Returns null;
		 * @example
		 * mediaBreaks.destroy();
		 * 
		 */
		responsiveObj.destroy = function() {
			responsiveFn.remove(_settings);
			return null;
		};
	
		responsiveObj.add(_settings);
		
		return responsiveObj;
	};
	//=require ish.core.js
	//
	// Code Inspired by:
	// https://github.com/remy/bind.js/blob/master/README.md
	// https://gist.github.com/384583
	// http://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes
	
	// watchableProtoModule
	// TODO: Write tests before any further updates, then
	// TODO: batch updates rather than individual calls
	// TODO: use Proxy and regress to current implementation if not availiable
	// TODO: Document
	(function(){
	    var emit = function (type, prop, oldValue, value){
	        this._watchHandlers[type].forEach(function(handler){
	            handler.call(this, {
	                type: type,
	                prop: prop,
	                previousValue: oldValue,
	                value: value
	            });
	        }, this);
	    };
	    // set value and call handler fn
	    var setAndCallHandler = function (prop, value, oldValue){
	        this.__watchShadow[prop] = value;
	        emit.call(this,'set', prop, oldValue, value);
	    };
	
	    var watchableProps = {
	        'watch': {
	            value : function (prop) {
	                var shadow = this.__watchShadow;
	                if(shadow[prop]) return; // if already being watched return
	                var oldValue = this[prop];
	                shadow[prop] = oldValue;
	                var mutatorCallback = function(newValue){
	                    setAndCallHandler.call(this, prop, newValue, shadow[prop]);
	                }.bind(this); 
	                // Lastly override the property defining new getter and setters
	                Object.defineProperty(this, prop, {
	                    get: function () {
	                        return shadow[prop];
	                    }, 
	                    set: function (value) {
	                        var mutator = this._watchMutators[prop];
	                        if(mutator){
	                            mutator.call(this,prop, value, mutatorCallback);
	                        } else {
	                            setAndCallHandler.call(this, prop, value, shadow[prop]);
	                        }
	                    }, 
	                    enumerable: true, 
	                    configurable: true
	                });
	            }
	        },
	        'unwatch': {
	            value : function (prop) {
	                var value = this[prop];
	                delete this[prop]; // remove accessors
	                this[prop] = value; // reset the property
	                delete this.__watchShadow[prop]; // remove facade reference
	            }
	        }
	    };
	    // EXPOSED PROTOTYPES
	    $.fn.observableObject = Object.create({},watchableProps);
	    Object.defineProperties($.fn.observableObject, {
	        assign: {
	            value: function() {
	                var assigned = Object.assign.apply(this.__watchShadow,arguments);
	                for(var each in assigned) {
	                    // is the property being watched?
	                    if(!this.__watchShadow[each]){
	                        this.watch(each);
	                        // emit : new item added
	                        emit.call(this,'add',each, undefined, assigned[each]);
	                    }
	                }
	            }
	        }, 
	        deleteProps: {
	            value: function() {
	                var args = [].slice.call(arguments);
	                for (var i = 0; i < args.length; i++) {
	                    var value = this[args[i]];
	                    this.unwatch(args[i]);
	                    delete this[args[i]];
	                     // emit : item removed
	                    emit.call(this,'remove', args[i], value, undefined);
	                }
	            }
	        }
	    });
	
	    $.fn.observableArray = Object.create([],watchableProps);
	    ['pop','push','shift','splice','unshift'].forEach(function(method){
	        Object.defineProperty($.fn.observableArray, method, {
	            value: function() {
	                var args = [].slice.call(arguments);
	                var shadow = this.__watchShadow;
	                var index;
	                var i;
	                var returnValue = [][method].apply(this,arguments);
	                // TODO: improve the below if block
	                if(method==='pop') {
	                    index = shadow.length-2;
	                    emit.call(this,'remove', index, shadow[index], undefined);
	                } else if(method==='push') {
	                    index = shadow.length-1;
	                    for (i = 0; i < args.length; i++) {
	                        this.watch(index);
	                        emit.call(this,'add', index, args[i], undefined);
	                        index++;
	                    }
	                } else if(method==='shift') {
	                    index = 0;
	                    emit.call(this,'remove', index, shadow[index], undefined);
	                } else if(method==='splice') {
	                    index = args[0];
	                    var fromIndex = index;
	                    var deleteHowMany = args[1];
	                    var toAdd = args.slice(1, args.length-1);
	                    // removal
	                    if(deleteHowMany > 0) {
	                       for (i = 0; i < deleteHowMany; i++) {
	                            emit.call(this,'remove', index, shadow[i], undefined); 
	                            index++;
	                       }
	                    }
	                    // addition
	                    if(toAdd.length > 1) {
	                        index = fromIndex; // reset index
	                        for (i = 0; i < toAdd.length; i++) {
	                            emit.call(this,'add', index, undefined, toAdd[i]); 
	                            index++;
	                       }   
	                    }
	                } else if(method==='unshift') {
	                    index = shadow.length - args.length;
	                    for (i = 0; i < args.length; i++) {
	                        this.watch(index); 
	                        emit.call(this,'add', index, undefined, args[i]);
	                        index++;
	                    }
	                } 
	                
	                return returnValue;
	            }
	        });
	    });
	
	    Object.defineProperty($.fn.observableArray, 'length', {   
	        get: function(){
	            return this.__watchShadow.length;
	        },
	        set : function(newLen){
	            this.__watchShadow.length = newLen;
	        }
	    });
	
	    var createProps = function(handlers, mutators, shadow){
	        return {
	            _watchHandlers: { writable:true, value:handlers },
	            _watchMutators: { writable:true, value:mutators },    
	            __watchShadow: { writable:true, value: shadow }
	        };
	    };
	    // EXPOSED METHODS
	    // WATCHABLE: OBJECT ONLY
	    $.watchable = function (obj, state) {  
	        var props = createProps(state.handlers, state.mutators, {});
	        var watchable = $.extend(Object.create($.fn.observableObject, props), obj);
	        return watchable;
	    };
	    // OBSERVABLE: Object || Array
	    $.observable = function (objectOrArray, state) {
	        //var objectOrArray = state.data;
	        var isArray = Array.isArray(objectOrArray);
	        var proto = isArray ? $.fn.observableArray : $.fn.observableObject;   
	        var shadow = isArray ? [] : {};
	        var props = createProps(state.handlers, state.mutators, shadow);
	        var observedObject = $.extend(Object.create(proto,props), objectOrArray);
	        for(var each in observedObject) {
	            //watch every property in the object, adding the composed handler and a mutator functions.
	            observedObject.watch(each);
	        }
	        return observedObject;
	    };
	})(); 
	
	/*
	// Observable : Object
	var observeObjectHandler = function(){
	    console.log('observed!!! ', this, arguments)
	};
	
	var observedObj = ish.observable({data:'hello', text:'heya'}, {
	    handlers: {
	        set: [observeObjectHandler],
	        add: [observeObjectHandler],
	        remove: [observeObjectHandler]
	        },
	    mutators: {
	        data: function(prop,value,callback){callback('mutated data value: '+value);},
	        text: function(prop,value,callback){callback('mutated text value: '+value);}
	    }
	});
	
	console.log('inital : ',observedObj);
	
	observedObj._watchMutators.data = function(prop,value,callback){
	    callback('updated mutated text value: '+value);
	};
	
	observedObj.data = 'changed'; // works
	observedObj.text = 'hello'; // works
	observedObj.new  = 'new'; // doesnt work will be watched.
	observedObj.watch('new'); // if setting an Object value with dot or bracket syntax you must call watch manually.
	observedObj.new  = 'new new';
	ish.extend(observedObj, {data: 'ish.extend value', text: 'ish.extend text value'}); //works, but new values are not watched
	observedObj.assign(observedObj, {data: 'Object.assign value', text: 'Object.assign text value', assignedNew: 'assignedNewValue'}); // works
	
	
	console.log('delete');
	//delete observedObj.data; // cannot hook to delte so it should be avoided.
	observedObj.deleteProps('data');
	
	Object.defineProperty(observedObj, 'text' , {
	    value: 'definedPropValue'
	}); // as expected defineProperty will remove the getter/setter from the property
	
	
	
	for(var each in observedObj) {
	    console.log('each  ',each,observedObj[each]);
	}
	////////////////////////////////////////////////////////
	// Observable : ARRAY 
	///////////////////////////////////////////////////////
	var observeArrayHandler = function(){
	    console.log('change observed: ', arguments)
	
	};
	
	var observedArray = ish.observable([1, 'hello','heya', true], {
	    handlers: {
	        set: [observeArrayHandler],
	        add: [observeArrayHandler],
	        remove: [observeArrayHandler]
	    },
	    mutators: {
	        0: function(prop,value,callback){callback('mutated data value: '+value);},
	        1: function(prop,value,callback){callback('mutated text value: '+value);}
	    }
	});
	
	observedArray._watchMutators.data = function(prop,value,callback){
	    callback('updated mutated text value: '+value);
	};
	
	observedArray.reverse();
	console.log('inital : ',observedArray);
	observedArray[0] = 'changed 0';
	observedArray[1] = 'changed 1';
	observedArray.push('pushed value');
	observedArray.pop('pushed value');
	
	observedArray[0] = 'changed 0 again';
	observedArray[1] = 'changed 1 again';
	
	console.log('inital : ',observedArray, observedArray.length);
	
	*/
	
	/*
	// WATCHABLE: Object only usage examples
	var dataWatchCallback = function(){
	        console.log('data has changed ',arguments);
	};
	
	var watchableObject = ish.watchable({data:'hello', text:'heya'},dataWatchCallback, {
	handlers: {
	        set: [dataWatchCallback],
	        add: [dataWatchCallback],
	        remove: [dataWatchCallback]
	    },
	    mutators:{
	        data : function(prop,value, callback){
	            //mutator fn
	            return callback('mutated value: ' + value);
	        }
	    }
	
	});
	
	console.log('inital : ',watchableObject.data);
	
	watchableObject.watch('data');
	watchableObject.data = 'changed';
	watchableObject.text = 'test changed';
	watchableObject.data = 'changedd';
	
	*/
	

	return $;

}(document, this); 