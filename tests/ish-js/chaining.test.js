
var noop = function () {};
describe('chaining', function () {
  'use strict';
  // left in, note that Firefox does not support empty selectors
  describe('unmatched selector', function () {
    it('should return trigger method from on', function () {
      expect(typeof ish('unmatched').on('event', noop).trigger).toBe('function');
    });

    it('should return on method from trigger', function () {
      expect(typeof ish('unmatched').on('event', noop).trigger('event').on).toBe('function');
    });
  });

  describe('empty selector', function () {
    it('should still allow for chained methods', function () {
      expect(typeof ish('').on('event', noop).trigger).toBe('function');
    });
  });

  describe('matched selector', function () {
    var $link;

    beforeEach(function () {
      appendToDom('section', ['a']);

      $link = ish('section > a');
    });

    afterEach(destroyDom);

    it('should return trigger method from on', function () {
      expect(typeof $link.on('event', noop).trigger).toBe('function');
    });

    it('should return on method from trigger', function () {
      expect(typeof $link.on('event', noop).trigger('event').on).toBe('function');
    });
  });
});


