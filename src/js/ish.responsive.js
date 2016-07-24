//=require ish.core.js
// SINGELTON
var responsiveFn = function() {

	var _settings = [];
	var _state = [];
	var _windowWidth;
	var _windowHeight;


	// PUBLICS
	/*
	NOT IN USE
	this.destroy = function() {
		$(window).off('resize', onResizeFn);
		return null;
	};
 	*/
	this.add = function(settings) {
		_settings.push(settings);
		setState();
		return this;
	};

	this.remove = function(settings) {
		_settings.forEach(function(el, i) {
			if (el === settings) _settings.splice(i, 1);
		});
		return this;
	};
	// PRIVATES
	var onResizeFn = function(evt) {
		//_windowWidth
		setState();
	};

	var setState = function() {
		_windowWidth = window.innerWidth;
		_windowHeight = window.innerHeight;

		_settings.forEach(function(el, i) {
			var tempState;
			var tempValueType; //width = 0 || height = 1
			el.breakpoints.forEach(function(obj, i) {
				var name = obj.name;
				var _widthValue = obj.width || null;
				var _heightValue = obj.height || null;
				el.state = el.state || [];

				var widthTest = _widthValue && _windowWidth > _widthValue;
				var heightTest = _heightValue && _windowHeight > _heightValue;

				if (widthTest) {
					tempState = name;
					tempValueType = 0;
				} else if (heightTest) {
					tempState = name;
					tempValueType = 1;
				}				
			});

			if (tempState && 
				tempValueType !== null && 
				el.state[tempValueType] !== tempState || 
				tempState === '') {
				
				el.state[tempValueType] = tempState;
				/**
				 * @memberOf ish.responsive
				 * @event ish.responsive.onBreakpoint
				 * @property {String} name The name of the breakpoint as defined in the options object.
				 */
				$(window).trigger(el.eventPrefix + '.onBreakpoint', {
					name: el.state[tempValueType]
				});
			}
		});
	};

	var init = function() {
		setState();
		$(window).on('resize', onResizeFn);
	}.call(this);

	return this;
}.call({});


/**
 * Calls an event when breakpoints are reached.
 * @name  ish.responsive
 * @constructor
 * @fires ish.responsive.onBreakpoint
 * @param {object} options
 * @param {Array} options.breakpoints An Array of Objects where the key is the name of the breakpoint and the value is the value that breakpoint will be triggered.
 * @param {string} options.eventPrefix The prefix or namespace events will be called under. 
 * @return {ish.responsive} The Responsive instances public API.
 * @example
var mediaBreaks = ish.responsive({
	breakpoints: [{
		name: 'mobile',
		width: 0
	}, {
		name: 'tablet',
		width: 640
	}, {
		name: 'desktop',
		width: 1024
	}],
	eventPrefix: 'ish.responsive'
 });
 */

var responsive = function(options) {
	var _settings = $.extend({
			breakpoints: [{
				name: 'mobile',
				width: 0
			}, {
				name: 'tablet',
				width: 640
			}, {
				name: 'desktop',
				width: 1024
			}],
			eventPrefix: 'ish.responsive'
		},
		options || {});

	/**
	 * Removes all breakpoints for the instance and returns null. We cannot destroy the module internally, but you can use the return value to null out your references if you wish. 
	 * @memberOf ish.responsive
	 * @return {null} Returns null;
	 * @example
	 * mediaBreaks.destroy();
	 * 
	 */
	this.destroy = function() {
		responsiveFn.remove(_settings);
		return null;
	};

	var init = function() {
		responsiveFn.add(_settings);
	}.call(this);

	return this;
};

$.responsive = function(options) {
	return responsive.call({}, options);
};