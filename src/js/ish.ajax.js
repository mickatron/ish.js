/**
 * Make an XHR request. The implementation is currently very basic.
 * @name  ajax
 * @function
 * @memberof ish
 * @param  {Object} options
 * @param  {String} options.type Acceptable values are; 'GET','POST','PUT','DELETE'.
 * @param  {String} options.url  The url of the request.
 * @param  {Function} options.success A callback function triggered when the ajax call is successful.
 * @param  {Function} options.error  A callback function triggered if the ajax call is unsuccessful.
 * @param  {Object} options.data A custom data object to pass with the request.
 * @param  {Object} options.headers An Object with String key values representing the header and its values. You can add custom header values here. 
 * @param  {String} options.headers.Accept By default the Accept header is ommited although it is a common one to set so it gains a mention here. Common values are: `"text/plain"`, `"text/html"`, `"application/xml, text/xml"`, `"application/json, text/javascript"`
 * @param  {String} options.headers.Content-Type Default value is `'application/x-www-form-urlencoded'` other values often used are: `'text/plain'`, `'multipart/form-data'`, `'application/json'` or `'text/xml'`.
 * @param  {String} options.headers.X-Requested-With Default value is 'XMLHttpRequest'.
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
 * 	url: 'http://domain.com/ajaxhandler',
 * 	success: onSuccess,
 * 	error: onError,
 * 	data: {"JSON":"data"}
 * });
 */
$.ajax = function(options) {

	var settings = $.extend({
		type: 'GET', // PUT OR JSON, GET, POST
		url: '',
		success: function(message) {},
		error: function(message) {},
		data: '',
		headers: {
			"X-Requested-With": 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}, options);

	var xhr = new XMLHttpRequest();
	xhr.open(settings.type, encodeURI(settings.url));
	// REQUEST HEADERS
	var _headers = settings.headers;
	for ( var prop in _headers ) {
		xhr.setRequestHeader(prop, _headers[prop]);
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