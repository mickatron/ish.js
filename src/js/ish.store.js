
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

/**
 * Return an object with a 
 * @name  ish.deepProto
 * @function
 * @param  {Object} object      The object which contains the value you're attempting to resolve.
 * @return {Object}             The resolved value.
 * @example
 *
 * var deepProtoObject = { 
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

$.deepProto = function (object) {
    // todo: consider Array more closely
    // when es6 is more common subclassing an array is not so difficult - worry about it then.
    var newObject = Object.create(object);
    for(var each in object) {
        var value = object[each];
        if(value){
            if(typeof value === 'object') {
                newObject[each] = $.deepProto(value);
            } else if(Array.isArray(object[each])) {
                for (var i = 0; i < object[each].length; i++) {
                    var val = object[each][i];
                    if(typeof val === 'object') {
                        val = $.deepProto(val);
                    }
                }
            }
        }
    }
    return newObject;
};
