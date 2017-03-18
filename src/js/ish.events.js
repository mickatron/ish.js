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