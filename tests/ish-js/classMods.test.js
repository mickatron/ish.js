// hasClass, removeClass, addClass
describe('class modifiers', function() {
	'use strict';
	// Tests
	describe('regular Node usage', function() {
		var $link;

		beforeEach(function() {
			appendToDom('section', ['a']);
			$link = ish(ish('section > a')[0]);
		});

		afterEach(window.destroyDom);

		it('should have class', function() {
			$link.addClass('test');
			expect($link.hasClass('test')).toBe(true);
		});
		it('should not have class', function() {
			$link.addClass('test');
			$link.removeClass('test');
			expect($link.hasClass('test')).toBe(false);
		});
		// chainable
		it('should be chainable', function() {
			expect($link.addClass('test').removeClass('test').hasClass('test')).toBe(false);
		});

	});

});