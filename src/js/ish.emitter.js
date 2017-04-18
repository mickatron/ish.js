
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