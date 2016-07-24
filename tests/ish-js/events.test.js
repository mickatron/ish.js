describe("$('selector').on()", function() {
  'use strict';
  var spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
  });

  it("on/off works on an element", function() {
    var $body = ish('body');

    $body.on('click', spy);
    $body.trigger('click');
    expect(spy.calls.count()).toEqual(1);

    $body.off('click', spy);
    $body.trigger('click');
    expect(spy.calls.count()).toEqual(1);

  });

  it('should not trigger an event on a non-element', function() {
    ish('.this-isnt-on-the-dom').on('event', spy);

    ish('.this-isnt-on-the-dom').trigger('event');

    expect(spy.calls.count()).toEqual(0);
  });

  describe('on/off multiple elements', function() {
    beforeEach(function() {
      appendToDom('div', ['a', 'a']);
    });

    afterEach(window.destroyDom);

    it('should trigger', function() {
      ish('div > a').on('click', spy).trigger('click');
      expect(spy.calls.count()).toEqual(2);
    });

    it('should NOT trigger', function() {
      ish('div > a').on('click', spy).off('click', spy).trigger('click');
      expect(spy.calls.count()).toEqual(0);
    });

  });
});

// Delegation
describe('delegation', function() {
  var $section,
    $article,
    spy;

  beforeEach(function() {
    spy = jasmine.createSpy('spy');
    appendToDom('section', ['article', 'a', 'a']);

    $section = ish('section');
    $article = ish('section > article');
  });

  afterEach(window.destroyDom);

  it('should trigger container events from children', function() {
    var target;

    $section
      .on('event', spy)
      .on('event', function(event) {
        target = event.target;
      });

    $article.trigger('event');

    expect(spy.calls.count()).toEqual(1);
    expect(target).toBe($article[0]);
  });

  it('should trigger click event using event delegation', function() {
    ish('body').on('click', spy, 'section > a');
    ish('section > a').trigger('click');

    expect(spy.calls.count()).toEqual(2);
    ish('section > a').trigger('click');
    expect(spy.calls.count()).toEqual(4);
    ish('section > a').trigger('click');
    expect(spy.calls.count()).toEqual(6);
  });
});