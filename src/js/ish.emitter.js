$.fn.emitter = {
	init: function (){
 		this.listeners = {};

 		return this;
	},
	emit: function(type, argsObject){
		var listeners = this.listeners[type];
		if(!listeners) return this;
		for (var handler in listeners) {
			listeners[handler].call(this, argsObject);
		}
		return this;
	},
	subscribe: function(type, fn){
		this.listeners[type] = this.listeners[type] || [];
		this.listeners[type].push(fn);
		return this;
	},
	unsubscribe: function(type, fn){
		var listeners = this.listeners[type];
		var index = listeners.indexOf(fn);
		listeners.splice(index, 1);
		return this;
	}
};

$.emitter = function(){
	//var factory = Object.create($.fn.emitter).init();
	//console.log('emitter ', factory);
	//factory.listeners = {};
	return Object.create($.fn.emitter).init();
};
