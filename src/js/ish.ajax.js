/**
 * Make an XHR request. The implementation is currently very basic, the response is not parsed as JSON or converted to a String, you will have to do that to the response manually when it's returned. 
 * @name  ajax
 * @function
 * @memberof ish
 * @param  {Object} options
 * @param  {String} options.type Acceptable values are; 'GET','POST','PUT','DELETE'.
 * @param  {String} options.url  The url of the request.
 * @param  {Function} options.success A callback function triggered when the ajax call is successful. The responseText is passed as the first parameter of the function, other values are availiable from the XMLHttpRequest Object returned from this component.
 * @param  {Function} options.error  A callback function triggered if the ajax call is unsuccessful.
 * @param  {Object} options.data A custom data object to pass with the request.
 * @param  {Object} options.headers An Object with String key values representing the header and its values. You can add custom header values here. 
 * @param  {String} options.headers.Accept By default the Accept header is ommited although it is a common one to set so it gains a mention here. Common values are: `"text/plain"`, `"text/html"`, `"application/xml, text/xml"`, `"application/json, text/javascript"`
 * @param  {String} options.headers.Content-Type Default value is `'application/x-www-form-urlencoded'` other values often used are: `'text/plain'`, `'multipart/form-data'`, `'application/json'` or `'text/xml'`.
 * @param  {String} options.headers.X-Requested-With Default value is 'XMLHttpRequest'.
 * @return {ish}     Returns the XMLHttpRequest Object.
 * @example
 * var reqSuccess = function(data){
 * 	//success
 * 	console.log('success', data, req);
 * };
 * var reqError = function(statusText, status){
 * 	//error
 * 	console.log('There was an error. '+status+' : '+statusText, req);
 * };
 * 
 * var req = ish.ajax({
 * 	type:'JSON',
 * 	url: 'http://domain.com/ajaxhandler',
 * 	success: reqSuccess,
 * 	error: reqError,
 * 	data: {"JSON":"data"}
 * });
 */
$.ajax = function(options) {

	var settings = $.extend({
		type: 'GET', // PUT OR JSON, GET, POST
		url: '',
		success: null,
		error: null,
		data: '',
		headers: {
			"X-Requested-With": 'XMLHttpRequest',
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}, options);

	var xhr = new XMLHttpRequest();
	xhr.open(settings.type, encodeURI(settings.url));

	var _successFn = settings.success;
	var _errorFn = settings.error;
	// SET REQUEST HEADERS
	var _headers = settings.headers;
	for ( var prop in _headers ) {
		xhr.setRequestHeader(prop, _headers[prop]);
	}
	// Listen to ONLOAD EVENT
	xhr.onload = function() {
		if (xhr.status === 200) {
			if(_successFn) _successFn( xhr.responseText );
		} else {
			if(_errorFn) _errorFn( xhr.statusText, xhr.status );
		}
	};

	xhr.send(settings.data);
	return xhr; // Theres no publics so just return the xhr obj.
};