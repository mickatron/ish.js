/**
 * Resolves an Object path given in String format within the given Object.
 * @name  ish.resolveObjectPath
 * @function
 * @param  {Object} object      The object which contains the value you're attempting to resolve.
 * @param  {String} pathString  The path of the value which you are attempting to resolve.  
 * @return {Object}             The resolved value.
 * @example
 *
 * var object = {
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
$.resolveObjectPath = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
};

/**
 * Sets an the value of an Object path given in String format within the given Object.
 * @name  ish.setPathByString
 * @function
 * @param  {Object} object      The object which contains the value you're attempting to set.
 * @param  {String} pathString  The path of the value which you are attempting to set.
 * @param  {value} value        The value you're attempting to set.
 * @return {Object}             The resolved value.
 * @example
 *
 * var object = { 
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
$.setPathByString = function(object, propertyString, value){
    //propertyString = propertyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    //propertyString = propertyString.replace(/^\./, '');           // strip a leading dot
    var props = propertyString.split('.');
    var obj = object;
    for (var i = 0; i < props.length; i++) {
        if( i === props.length -1) {
            obj[props[i]] = value;
            return obj[props[i]];
        }
        if(!obj[props[i]]) {
            obj[props[i]] = {};
        } 
        obj = obj[props[i]];
    }
};

