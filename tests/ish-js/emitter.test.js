describe('emitter:', function() {
	'use strict';
	var emitter;
	var subscriberSpy, subscriberSpyTwo;
	var listeners;

	describe('$.emitter()', function() {

		beforeEach(function() {
			emitter = ish.emitter();
			subscriberSpy = jasmine.createSpy('spy');
			subscriberSpyTwo = jasmine.createSpy('spy2');
			emitter.subscribe('ON_EMIT', subscriberSpy);
			emitter.subscribe('ON_EMIT', subscriberSpyTwo);
			listeners = emitter.listeners.ON_EMIT;
		});

		it('can subscribe', function() {
			expect(listeners.length).toEqual(2);
		});
		
		it('can emit', function() {
			emitter.emit('ON_EMIT');
		    expect(subscriberSpy.calls.count()).toEqual(1);
		    expect(subscriberSpyTwo.calls.count()).toEqual(1);
		});
		
		it('can unsubscribe', function() {
			emitter.unsubscribe('ON_EMIT', subscriberSpy);
			expect(listeners.length).toEqual(1);
			emitter.emit('ON_EMIT');
		    expect(subscriberSpy.calls.count()).toEqual(0);
		    expect(subscriberSpyTwo.calls.count()).toEqual(1);

		});

		it('can flush subscribers/listeners', function() {
			emitter.flush();
			emitter.emit('ON_EMIT');
			expect(emitter.listeners).toEqual({});
		    expect(subscriberSpy.calls.count()).toEqual(0);
		    expect(subscriberSpyTwo.calls.count()).toEqual(0);
		});

	});

});