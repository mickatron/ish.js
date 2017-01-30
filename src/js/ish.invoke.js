/**
 * A deprecated factory helper function. Not included in any default dist, compile your own if you wish to use. This will be removed before official beta release.
 * @function
 * @name  ishObject.invoke
 * @param {Object} module    The module or components function body.
 * @param {Object} options   The module or components options Object.
 * @param {Object} context   An Object context to invoke/execute the module or component upon.
 * @return {Object}          Each instance in referenced by number in the order they were invoked.
 * @example
 * // basic usage, no options, context or parentObject used
 * ish('selector').invoke(function($element, options) {
 * 		//The module code body
 * },{options},null);
 * 
 */
ishObject.invoke = function(module, options, context) {
	options = options || {};
	var createdModules = {}; // could/should this be an array?
	options.selector = this.selector;
	this.forEach(function($el, i) {
		var currContext = context || {};
		options.node = $el[0];
		createdModules[i] = module.call(currContext, options, $el[0], options.selector);
	});
	return createdModules;
};