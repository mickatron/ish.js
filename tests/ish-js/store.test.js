describe('store:', function() {
	'use strict';
	
	var store = ish.store;


describe('$.store.createDataState()', function() {
		var state;
		it('can create data state store', function() {
			state = store.createDataState('dataStore', function(){
				//var modelData = this.model = {};
				var stateDataObject = this.store = {};
				var actions = this.actions;

				actions.set = function(state){
					//ish.extend(this.model, state);
					ish.extend(this.store, state);
					this.emit('ON_SET', {state: this.store, });
				}.bind(this);

			});

			expect(typeof store.data.dataStore.actions.set).toBe('function');

		});

		it('can add data to store', function() {

			var spy = jasmine.createSpy('spy');
			state.subscribe('ON_SET',spy);
			state.actions.set({
				data: 'value',
				id: 123,
				arr: ['arrValue',456],
				obj: {
					data: 'objvalue',
					id: 123456
				}
			});

			expect(spy.calls.count()).toBe(1);
		});


	});

	describe('$.store.createComState()', function() {
		var state;
		it('can create component state store', function() {
			state = store.createComState('component', function(){
				var stateDataObject = this.store = {};
				var actions = this.actions;

				actions.set = function(state){
					//ish.extend(this.model, state);
					ish.extend(this.store, state);
					this.emit('ON_SET', {state: this.store, });
				}.bind(this);
			});
		});


		it('can add data to store', function() {

			var spy = jasmine.createSpy('spy');
			state.subscribe('ON_SET',spy);
			state.actions.set({
				data: 'value',
				id: 123,
				arr: ['arrValue',456],
				obj: {
					data: 'objvalue',
					id: 123456
				}
			});

			expect(spy.calls.count()).toBe(1);
		});


	});
});