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
                var args = [].slice.call(arguments);
                args.unshift(this);
                var assigned = Object.assign.apply(null,args);
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

    $.fn.observableArray = Object.create(null,watchableProps);
    var _arrayProto = Array.prototype;
    var arrayMethodNames = Object.getOwnPropertyNames(_arrayProto);
    var augmentedNames = ['pop','push','shift','splice','unshift','length', 'constructor'];

    for( var item in augmentedNames ) {
        var index = arrayMethodNames.indexOf(augmentedNames[item]);
        arrayMethodNames.splice(index, 1);
    }

    arrayMethodNames.forEach(function(method){
        Object.defineProperty($.fn.observableArray, method, {
            value: function(){
                var shadow = this.__watchShadow;
                return  shadow[method].apply(shadow,arguments);
            }
        });

    });

    ['pop','push','shift','splice','unshift'].forEach(function(method){
        Object.defineProperty($.fn.observableArray, method, {
            value: function() {
                var args = _arrayProto.slice.call(arguments);
                var shadow = this.__watchShadow;
                var index;
                var i;
                var returnValue = _arrayProto[method].apply(this,arguments);
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
                    if(toAdd.length >= 1) {
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
    
/**
 * Creates a watchable Object.
 * @name  ish.watchable
 * @constructor
 * @param {object} options
 * @param {state} options.breakpoints An Array of Objects where the key is the name of the breakpoint and the value is the value that breakpoint will be triggered.
 * @param {state.mutators} An object of mutator functions. Objects keys represent the value to be mutated.
 * @param {state.handlers} An object containing arrays of callback functions.
 * @param {state.handlers.set} Item set callbacks
 * @param {state.handlers.add} Item add callbacks
 * @param {state.handlers.remove}  Item remove callbacks
 * @return {ish.watchable} The watchable instances public API.
 * @example
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
 });
 */

    $.watchable = function (obj, state) {  
        var props = createProps(state.handlers, state.mutators, {});
        var watchable = $.extend(Object.create($.fn.observableObject, props), obj);
        return watchable;
    };

/**
 * Creates an observable Object or Array.
 * @name  ish.observe
 * @constructor
 * @param {object} options
 * @param {state} options.breakpoints An Array of Objects where the key is the name of the breakpoint and the value is the value that breakpoint will be triggered.
  * @param {state.mutators} An object of mutator functions. Objects keys represent the value to be mutated.
 * @param {state.handlers} An object containing arrays of callback functions.
 * @param {state.handlers.set} Item set callbacks
 * @param {state.handlers.add} Item add callbacks
 * @param {state.handlers.remove}  Item remove callbacks
 * @return {ish.observe} The watchable instances public API.
 * @example
// Observable : Object
var observeObjectHandler = function(){
    console.log('observed!!! ', this, arguments)
};

var observedObj = ish.observe({data:'hello', text:'heya'}, {
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

 });
 */

    // OBSERVABLE: Object || Array
    $.observe = function (objectOrArray, state) {
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

var observedObj = ish.observe({data:'hello', text:'heya'}, {
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

var observedArray = ish.observe([1, 'hello','heya', true], {
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
