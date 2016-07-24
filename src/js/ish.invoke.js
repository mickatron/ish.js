/**
 * A factory helper function. Creates a module which will do work on the DOM. For example, carousels, dialogs, modals... Using this method is useful when you want to instantiate multiple instances on a collection of DOM Nodes, if you just want to create a single instance you can use the Function.call() syntax or similar.
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
	context = context || {};
	var createdModules = {}; // could/should this be an array?
	options.selector = this.selector;
	this.forEach(function($el, i) {
		options.node = $el[0];
		createdModules[i] = module.call(context, options, $el[0], options.selector);
		if (!context) context = {};
	});
	return createdModules;
};