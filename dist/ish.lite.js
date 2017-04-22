
var ish = function(document, window, $) {
  'use strict';
  /* Lib core
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
  
  //Returns true if it is a DOM node
  function isNode(o) {
  	return (
  		typeof Node === "object" ? o instanceof Node :
  		o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
  	);
  }
  
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

  return $;

}(document, this);