describe('ajax', function() {
	'use strict';
	beforeEach(function(done) {

		done();
	});
	it('callbacks should be invokable', function() {
		//when ish.ajax is called jasmine will invoke the success and error callbacks
		spyOn(ish, "ajax").and.callFake(function(options) {
			options.success();
			options.error();
		});
		// callback spies
		var callback = jasmine.createSpy();
		var failCallback = jasmine.createSpy();
		// ajax call
		ish.ajax({
			type: 'GET',
			URL: '/base/tests/test.response.json',
			success: callback,
			error: failCallback
		});
		// tests
		expect(callback.calls.count()).toEqual(1);
		expect(failCallback.calls.count()).toEqual(1);
	});
});