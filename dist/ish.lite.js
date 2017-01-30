
var ish = function(document, window, $) {
  'use strict';
  /* Lib core
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

  return $;

}(document, this);