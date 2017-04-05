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
