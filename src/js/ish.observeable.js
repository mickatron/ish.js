// 
// http://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes

// watchableProtoModule
// TODO: batch updates rather than individual calls
// TODO: Write tests
// TODO: Document
(function(){
    var emit = function (type, prop, oldValue, value){
        this.watchHandlers[type].forEach(function(handler){
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
                        var mutator = this.watchMutators[prop];
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
    Object.defineProperty($.fn.observableObject, 'assign', {
        value: function() {
            var assigned = Object.assign.apply(this.__watchShadow,arguments);
            for(var each in assigned) {
                // is the property being watched?
                if(!this.__watchShadow[each]){
                    console.log('assign called watching new prop '+each);
                    this.watch(each);
                    // emit : new item added
                    emit.call(this,'add',each, undefined, assigned[each]);
                }
            }

        }
    });
    Object.defineProperty($.fn.observableObject, 'deleteProps', {
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
    });

    $.fn.observableArray = Object.create([],watchableProps);
    ['pop','push','shift','splice','unshift'].forEach(function(method){
        Object.defineProperty($.fn.observableArray, method, {
            value: function() {
                var args = [].slice.call(arguments);
                var shadow = this.__watchShadow;
                var index;
                var i;
                // TODO: improve the below if block
                if(method==='pop') { 
                    // DONE
                    index = shadow.length-2;
                    emit.call(this,'remove', index, shadow[index], undefined);

                } else if(method==='push') {
                    // DONE
                    index = shadow.length-1;
                    for (i = 0; i < args.length; i++) {
                        this.watch(index);
                        emit.call(this,'add', index, args[i], undefined);
                        index++;
                    }
                } else if(method==='shift') {
                    // DONE
                    index = 0;
                    emit.call(this,'remove', index, shadow[index], undefined);

                } else if(method==='splice') {
                    // DONE
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
                    if(toAdd.length > 1) {
                        index = fromIndex; // reset index
                        for (i = 0; i < toAdd.length; i++) {
                            emit.call(this,'add', index, undefined, toAdd[i]); 
                            index++;
                       }   
                    }
                } else if(method==='unshift') { 
                    // DONE
                    index = shadow.length - args.length;
                    for (i = 0; i < args.length; i++) {
                        this.watch(index); 
                        emit.call(this,'add', index, undefined, args[i]);
                        index++;
                    }
                } 

                return [][method].apply(this,arguments);
            }
        });
    });
})(); 

// WATCHABLE: OBJECT ONLY
$.watchable = function (obj, handler, watchMutators) {  
    var objProps = {
        'watchHandlers': { // should have an underscore at the start
            writable:true,
            value: [handler] // object property
        },
        'watchMutators': {
            writable:true, 
            value: watchMutators || {}
        },    
        '__watchShadow': {
            writable: true,
            value : {}
        }
    };
    var watchable = $.extend(Object.create($.fn.observableObject, objProps), obj);
    return watchable;
};

// OBSERVABLE: Object || Array
$.observable = function (objectOrArray, state) {
    //var objectOrArray = state.data;
    var isArray = Array.isArray(objectOrArray);
    var proto = isArray ? $.fn.observableArray : $.fn.observableObject;   
    var shadow = isArray ? [] : {};
    // we dont want these to be enumerable so it loops like a regular object.
    var objProps = {
        'watchHandlers': {
            writable:true,
            value: state.handlers // object property
        },
        'watchMutators': {
            writable:true, 
            value: state.mutators || {}
        },    
        '__watchShadow': {
            writable: true,
            value : shadow
        }
    };
    // if it's an array add a length property
    if(isArray) $.extend (objProps,{ 
        'length' : {
            get: function(){
                return this.__watchShadow.length;
            },
            set : function(newLen){
                this.__watchShadow.length = newLen;
            }
        }
    });

    var observedObject = $.extend(Object.create(proto,objProps), objectOrArray);
    for(var each in observedObject) {
        //watch every property in the object, adding the composed handler and a mutator functions.
        observedObject.watch(each);
    }
    return observedObject;
};












/*


var observeHandler = function(){
    console.log('observed!!! ', this, arguments)

};
        

var observedObj = ish.observable({data:'hello', text:'heya'}, {
    handlers: {
        set: [observeHandler],
        add: [observeHandler],
        remove: [observeHandler]
        },
    mutators: {
        data: function(prop,value,callback){callback('mutated data value: '+value);},
        text: function(prop,value,callback){callback('mutated text value: '+value);}
    }
});

console.log('inital : ',observedObj);

observedObj.watchMutators.data = function(prop,value,callback){
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











// ARRAY 

var observeHandler = function(){
    console.log('change observed: ', arguments)

};
        

var observedArray = ish.observable([1, 'hello','heya', true], {
    handlers: {
        set: [observeHandler],
        add: [observeHandler],
        remove: [observeHandler]
    },
    mutators: {
        0: function(prop,value,callback){callback('mutated data value: '+value);},
        1: function(prop,value,callback){callback('mutated text value: '+value);}
    }
});


observedArray.watchMutators.data = function(prop,value,callback){
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

console.log('inital : ',observedArray);

*/








// WATCHABLE IS NOT REALLY workable for arrays.
/*

////// ARRAYusage examples
var observedObj = ish.watchable([1,true,'hey']);
   console.log('inital : ',observedObj);

var dataWatchCallback = function(){
        console.log('data has changed ',arguments);
};

observedObj.watch(0,{
    handler:dataWatchCallback,
    mutator: function(prop,value, callback){
        //mutator fn
        return callback('mutated value: ' + value);
    }
});
observedObj[0] = 'changed';
observedObj.push('pushed value');
console.log(observedObj[0], observedObj.map);





////// usage examples

var dataWatchCallback = function(){
        console.log('data has changed ',arguments);
};

var observedObj = ish.watchable({data:'hello', text:'heya'},dataWatchCallback, {
    'data' : function(prop,value, callback){
        //mutator fn
        return callback('mutated value: ' + value);
    }
});

   console.log('inital : ',observedObj.data);

observedObj.watch('data');
observedObj.data = 'changed';
observedObj.text = 'test changed';
observedObj.data = 'changedd';







observedObj.watch('data',{
    handler:dataWatchCallback,
    mutator: function(prop,value, callback){
        //mutator fn
        return callback('mutated value: ' + value);
    }
});

observedObj.watch('text',{
    handler: function(){
        console.log('text has changed ',arguments);
    }
});

// if the property doesnt exisit watch adds the property
observedObj.watch('newprop', {
    handler: function(){
        console.log('text has changed ',arguments);
    }
});


observedObj.data = 'changed';
observedObj.text = 'test changed';
observedObj.data = 'changedd';
observedObj.data = 'changedddd';
console.log('end : ',observedObj,observedObj.data,observedObj.text);

var props = Object.getOwnPropertyNames(observedObj);
for(var each in observedObj) {
    console.log('each  ',each,observedObj[each]);
}



*/
