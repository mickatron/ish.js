// hasClass, removeClass, addClass
describe('ish.observe', function() {
	'use strict';
	// Tests
	describe('Array usage', function() {
		var observedArray;
		var setSpy; // spy's are jasmine helper handlers for testing.
		var addSpy;
		var removeSpy;
		var originalArray = ['some text', 12, true];

		beforeEach(function() {
    		setSpy = jasmine.createSpy('setSpy');
    		addSpy = jasmine.createSpy('addSpy');
    		removeSpy = jasmine.createSpy('removeSpy');
			observedArray = ish.observe(['some text', 12, true], {
				handlers: {
			        set: [setSpy],
			        add: [addSpy],
			        remove: [removeSpy]
		        },
			    mutators: {
			        0: function(prop,value,callback){callback('mutated string value: '+value);},
			        1: function(prop,value,callback){callback(10+value);}
			    }
			});
		});

		it('set handlers are called', function() {
			observedArray[0] = 'changed'; // works
			observedArray[1] = 10; // works
			observedArray[2] = false; // works
    		expect(setSpy.calls.count()).toEqual(3);
		});

		it('values are mutated', function() {
			observedArray[0] = 'changed'; // works
    		expect(observedArray[0]).toEqual('mutated string value: changed');
			observedArray[1] = 10; // works
    		expect(observedArray[1]).toEqual(20);
			observedArray[2] = false; // works
    		expect(observedArray[2]).toEqual(false);
		});


		// array methods which trigger 
		it('push: ', function() {
			observedArray.push('pushed');
    		expect(addSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(4);
    		expect(observedArray[observedArray.length - 1]).toEqual('pushed');
		});
		it('pop: ', function() {
			var test = observedArray.pop();
    		expect(removeSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(2);
    		expect(observedArray[2]).toEqual(undefined);
    		expect(test).toEqual(originalArray[2]); // returns the correct value
		});

		it('shift:', function() {
			var test = observedArray.shift();
    		expect(removeSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(2);
    		expect(observedArray[0]).toEqual('mutated string value: '+originalArray[1]);
    		expect(test).toEqual(originalArray[0]); // returns the correct value
		});

		it('splice remove element', function() {
			var test = observedArray.splice(2,1);
    		expect(removeSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(2);
    		expect(observedArray[2]).toEqual(undefined);
    		expect(test).toEqual([originalArray[2]]); // returns the correct value
		});

		it('splice: remove elements', function() {
			var test = observedArray.splice(1,2);
    		expect(removeSpy.calls.count()).toEqual(2);
    		expect(observedArray.length).toEqual(1);
    		expect(observedArray[2]).toEqual(undefined);
    		expect(test).toEqual([ originalArray[1], originalArray[2] ]); // returns the correct value
		});

		it('splice: add element', function() {
			var test = observedArray.splice(2,0,'spliced');
    		expect(addSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(4);
    		expect(observedArray[2]).toEqual('spliced');
    		expect(test).toEqual([]); // returns the correct value
		});

		it('splice: add and removed element', function() {
			var test = observedArray.splice(2,1,'spliced');
    		expect(addSpy.calls.count()).toEqual(1);
    		expect(removeSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(3);
    		expect(observedArray[2]).toEqual('spliced');
    		expect(test).toEqual([originalArray[2]]); // returns the correct value
		});


		it('unshift: ', function() { 
			var test = observedArray.unshift('string');
    		expect(addSpy.calls.count()).toEqual(1);
    		expect(observedArray.length).toEqual(4);
    		expect(observedArray[0]).toEqual('mutated string value: string');
    		expect(test).toEqual(observedArray.length); // returns the correct value
		});


		// test a few other Array prototype methods which do not add or remove from the array.
		
		it('concat: ', function() { 
			var test = observedArray.concat(originalArray);
    		expect(test.length).toEqual(observedArray.length * 2);
    		expect(observedArray[0]).toEqual(originalArray[0]);
    		expect(test).toEqual([ 'some text', 12, true, 'some text', 12, true ]); // returns the correct value
		});

		
		it('indexOf: ', function() { 
			var test = observedArray.indexOf('some text');
    		expect(test).toEqual(0); // returns the correct value
		});

		/*it('find: ', function() { 
			function findText(prop) { 
			    return prop.name === 'some text';
			}

			var test = observedArray.find(findText);
    		//expect(addSpy.calls.count()).toEqual(1);
    		expect(test.length).toEqual(6);
    		expect(observedArray[0]).toEqual(originalArray[0]);
    		expect(test).toEqual(observedArray.length); // returns the correct value
		});*/





	});


	describe('Object usage', function() {
		var observedObj;
		var setSpy;
		var addSpy;
		var removeSpy;

		beforeEach(function() {

    		setSpy = jasmine.createSpy('setSpy');
    		addSpy = jasmine.createSpy('addSpy');
    		removeSpy = jasmine.createSpy('removeSpy');
			observedObj = ish.observe({text: 'some text', number: 12, bool: true}, {
				handlers: {
			        set: [setSpy],
			        add: [addSpy],
			        remove: [removeSpy]
		        },
			    mutators: {
			        number: function(prop,value,callback){callback(value+10);},
			        text: function(prop,value,callback){callback('mutated number value: '+value);}
			    }
			});
		});

		it('set handlers are called', function() {
			observedObj.text = 'changed'; // works
			observedObj.number = 10; // works
			observedObj.bool = false; // works
    		expect(setSpy.calls.count()).toEqual(3);
		});

		it('values are mutated', function() {
			observedObj.text = 'changed'; // works
    		expect(observedObj.text).toEqual('mutated number value: changed');
			observedObj.number = 10; // works
    		expect(observedObj.number).toEqual(20);
			observedObj.bool = false; // works
    		expect(observedObj.bool).toEqual(false);
		});


		it('remove handlers are called using API. bservedObj.deleteProps', function() {
			observedObj.deleteProps('text');
    		expect(removeSpy.calls.count()).toEqual(1);
		});

		it('value are removed using API. bservedObj.deleteProps', function() {
			observedObj.deleteProps('text');
    		expect(observedObj.text).toEqual(undefined);
		});

		it('add handlers are called using API. observedObj.assign', function() {
			observedObj.assign({assignedText: 'assigned', addignedNumber: 123, assignedBool: false});
			expect(addSpy.calls.count()).toEqual(3);
		});

		it('set handlers are called using API. observedObj.assign', function() {
			observedObj.assign({text: 'assigned', number: 123, bool: false});
			expect(setSpy.calls.count()).toEqual(3);
		});

	});

});