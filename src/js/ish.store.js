
$.store = {
	data: {},
	states: {},
	flush: function(){
		this.states = {};
		this.data = {};
		return this;
	},
	createDataState: function(name, fn){
		var ref = this.data[name] = $.emitter();
		ref.actions = {};
		ref.store = null;
		ref.model = null; 
		fn.call(ref);
		return ref;
	},
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
