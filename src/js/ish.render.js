/**
 * The name of the HTML attribute used to specify bindings.
 * @memberOf ish
 * @name bindAttrName
 * @type {String}
 */
var bindAttrName = $.bindAttrName = "ish-bind";
var noop = document.createElement('div');

/**
 * Render a template string with corresponding object data.
 * @name  ish.renderTemplate
 * @function
 * @param  {String}   templateString 	A valid HTML template string.
 * @param  {Object}   dataObject 		An object whose values will be bound to the rendered HTML.
 * @return {Node}         The rendered HTML template `Node` which can be inserted into the DOM.
 * @example
 *
 * var template = '<div><p ish-bind="textContent:text"></p></div>'
 * 
 * ish.renderTemplate(template, {text: 'Text has been rendered.'});
 */
$.renderTemplate = function (templateString, dataObject){
	noop.insertAdjacentHTML('afterbegin', templateString);
	var nodesToBind = $('['+bindAttrName+']',noop);
	nodesToBind.forEach(function(node){
		$.renderBind(node, dataObject);
	});
	var rendered = noop.removeChild(noop.firstChild);
	return rendered;
};

/**
 * Update a template Node with a corresponding object data.
 * @name  ish.updateTemplate
 * @function
 * @param  {Node}     updateNode 	The node to update, all child Node's will be updated.
 * @param  {Object}   updateObject 	An object whose values will be updated in the provided HTML.
 * @return {ish}       
 * @example
 *
 * var template = '<div><p ish-bind="textContent:text"></p></div>';
 * var renderedTemplate = ish.renderTemplate();
 * ish.updateTemplate(renderedTemplate, {});
 */
$.updateTemplate = function (updateNode, updates){
	// TODO refactor, should sit outside of this fn
	var updateTemplateEachFn = function(node){ $.renderBind(node, updates); };
	for(var each in updates) {
		$('['+bindAttrName+'*="'+each+'"]', updateNode).forEach(updateTemplateEachFn);
	}
	return $;
};

/**
 * Render the values given in the dataObject to a single node.
 * @name  ish.renderBind
 * @function
 * @param  {String}   domNode 		An exisiting DOM Node.
 * @param  {Object}   dataObject 	An object whose values will be bound to the rendered HTML.
 * @return {Node}     The rendered HTML template `Node` which can be inserted into the DOM.
 * @example
 *
 * var template = '<p ish-bind="textContent:text"></p>'
 * var node = ish.renderTemplate(template, {text:'text has been rendered'});
 * // you would usualy use ish.updateTemplate, this is just for exmaple
 * ish.renderBind(node, {text: 'text has been updated text'});
 */
$.renderBind = function (domNode, obj) {    
    var binds = domNode.attr(bindAttrName).split(" ");
    for (var i = 0; i < binds.length; i++) {
		var bind = binds[i].split(":");
	    var domAttribute = bind[0].trim(); // the attribute on the DOM element
	    var propertyAttribute = bind[1].trim(); // the attribute the object
	    var targetValue = domNode[0][domAttribute];
	    var resolvedPathValue = $.resolveObjectPath(obj, propertyAttribute);
	    if(resolvedPathValue && targetValue !== resolvedPathValue) domNode[0][domAttribute] =  resolvedPathValue;
    }
};

/**
 * Whilst the ish.renderBind method renders values to the DOM, ish.bindToObject sets the values of the binds DOM attributes in the target object.
 * @name  ish.bindToObject
 * @function
 * @param  {String}   domNode 		An exisiting DOM Node.
 * @param  {Object}   dataObject 	An object whose values will be bound to the rendered HTML.
 * @return {ish}      Chainable with other ish methods.
 * @example
 *
 * var template = '<p ish-bind="textContent:text"></p>'
 * var node = ish.renderTemplate(template, {text:'text has been rendered'});
 * // you would usualy use ish.updateTemplate, this is just for exmaple
 * ish.renderBind(node, {text: 'text has been updated text'});
 */
$.bindToObject = function (domNode, obj){
    var binds = domNode.attr(bindAttrName).split(" ");
	for (var i = 0; i < binds.length; i++) {
		var bind = binds[i].split(":");
	    var domAttribute = bind[0].trim(); // the attribute on the DOM element
	    var propertyAttribute = bind[1].trim(); // the attribute the object
	    var targetValue = domNode[0][domAttribute];
	    if(targetValue) $.setPathByString(obj, propertyAttribute, targetValue);
	}
	return this;
};