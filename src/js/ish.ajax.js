/**
 * Make an XHR request. The implementation is currently very basic.
 * @name  ajax
 * @function
 * @memberof ish
 * @param  {Object} options
 * @param  {String} options.type Acceptable values are; 'GET','POST','PUT','JSON'.
 * @param  {String} options.URL  The URL of the request.
 * @param  {Function} options.success A callback function triggered when the ajax call is successful.
 * @param  {Function} options.error  A callback function triggered if the ajax call is unsuccessful.
 * @param  {Object} options.data A custom data object to pass with the request.
 * @return {ish}     Returns the ish Object.
 * @example
 * var onSuccess = function(data){
 * 	//success
 * };
 * var onError = function(data){
 * 	//error
 * };
 * 
 * ish.ajax({
 * 	type:'JSON',
 * 	URL: 'http://domain.com/ajaxhandler',
 * 	success: onSuccess,
 * 	error: onError,
 * 	data: {"JSON":"data"}
 * });
 */
$.ajax = function(options) {

	var settings = $.extend({
		type: 'GET', // PUT OR JSON, GET, POST
		URL: '',
		success: function(message) {},
		error: function(message) {},
		data: ''
	}, options);

	settings.type = settings.type.toUpperCase();
	if (settings.type === "JSON") {
		settings.type = 'PUT';
	}

	var xhr = new XMLHttpRequest();
	xhr.open(settings.type, encodeURI(settings.URL));

	if (settings.type === 'PUT') {
		xhr.setRequestHeader('Content-Type', 'application/json');
		data = JSON.stringify(settings.data);
	}

	if (settings.type === 'POST') {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	}

	xhr.onload = function() {
		if (xhr.status === 200) {
			settings.success(xhr.responseText);
		} else {
			settings.error(xhr.status);
		}
	};

	xhr.send(settings.data);
	return this;
};