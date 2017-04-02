$.fn.emitter = {
	log: [],
	emit: function(type, argsObject){
		var listeners = this.listeners[type];
		if(!listeners) return this;
		for (var handler in listeners) {
			listeners[handler].call(this, argsObject);
		}
		if($.fn.emitter.log !== false) $.fn.emitter.log.push({type: type, arguments: argsObject });
		return this;
	},
	subscribe: function(type, fn){
		this.listeners[type] = this.listeners[type] || [];
		this.listeners[type].push(fn);
		return this;
	},
	unsubscribe: function(type, fn){
		var listeners = this.listeners[type];
		if(listeners){
			var index = listeners.indexOf(fn);
			listeners.splice(index, 1);
		}		
		return this;
	}
};

$.emitter = function(){
	var factory = Object.create($.fn.emitter);
	factory.listeners = {};
	return factory;
};