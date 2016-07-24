//=require ish.core.js

var hasClass = 'hasClass',
	addClass = 'addClass',
	removeClass = 'removeClass';

/**
 * Tests if a particular class name is found on a Node within the given ishObject. 
 * This method will check the whole collection, if you want to check a specific 
 * selector you will be required to filter the collection before making the check.
 * @name ishObject.hasClass
 * @function
 * @param  {String} test 	The class name to test against the collection.
 * @return {boolean}      	If the class name was found on the collection.
 * @example
 * ish('selector').hasClass('className');
 */
ishObject[hasClass] = function(test) {
	var found = false;
	this[forEach](function(el) {
		if (RegExp(' ' + test + ' ').test(' ' + el[0].className + ' ')) {
			found = true;
		}
	});
	return found;
};

/**
 * Removes a class name from each Node in the given ishObject.
 * @name ishObject.removeClass
 * @function
 * @param  {String} name [description]
 * @return {ishObject}      [description]
 * @example
 * ish('selector').removeClass('className');
 */
ishObject[removeClass] = function(name) {
	this[forEach](function(el) {
		if (el.hasClass(name)) {
			var newClass = ' ' + el[0].className.replace(/[\t\r\n]/g, ' ') + ' ';
			while (newClass.indexOf(' ' + name + ' ') >= 0) {
				newClass = newClass.replace(' ' + name + ' ', ' ');
			}
			el[0].className = newClass.replace(/^\s+|\s+$/g, '');
		}
	});
	return this;
};

/**
 * Adds a class name to each Node in the given ishObject.
 * @name ishObject.addClass
 * @function
 * @param  {string} name [description]
 * @return {ishObject}      [description]
 * @example
 * ish('selector').addClass('className');
 */
ishObject[addClass] = function(name) {
	this[forEach](function(el) {
		if (!el.hasClass(name)) {
			el[0].className += ' ' + name; // just adding a space to the start of every name saves a little code and makes little difference in HTML.
		}
	});
	return this;
};