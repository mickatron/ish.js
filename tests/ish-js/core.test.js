describe('core', function() {
  'use strict';
  //Selector Tests
  describe('ish() - empty selector', function() {
    var $empty = ish('');

    it('should return on method', function() {
      expect(typeof $empty.on).toBe('function');
    });

    it('should return trigger method', function() {
      expect(typeof $empty.trigger).toBe('function');
    });
  });

  describe('ish() - matched selector', function() {
    var $link;

    beforeEach(function() {
      appendToDom('section', ['a']);

      $link = ish('section > a');
    });

    afterEach(function() {
      destroyDom();
    });

    it('should return on method', function() {
      expect(typeof $link.on).toBe('function');
    });

    it('should return trigger method', function() {
      expect(typeof $link.trigger).toBe('function');
    });
  });

  describe('ish() - ish() selector', function() {
    var $link, $context;

    beforeEach(function() {
      appendToDom('section', ['a']);

      $context = ish('section');
      $link = ish('a', $context);
    });
    afterEach(function() {
      destroyDom();
    });
    it('should have a length of 1', function() {
      expect($link.length).toEqual(1);
    });
    it('should return on method', function() {
      expect(typeof $link.on).toBe('function');
    });

    it('should return trigger method', function() {
      expect(typeof $link.trigger).toBe('function');
    });

  });
  describe('ish() - native addEventListener events', function() {
    var spy;
    beforeEach(function() {
      spy = jasmine.createSpy('spy');
      appendToDom('div', ['a']);
    });

    afterEach(window.destroyDom);

    it('should trigger', function() {
      ish('div > a')[0].addEventListener('click', spy);
      ish('div > a').trigger('click');
      expect(spy.calls.count()).toEqual(1);
    });
  });


  //  Nodelist forEach test
  describe('ish.forEach()', function() {
    var $link;

    beforeEach(function() {
      appendToDom('section', ['a', 'a', 'a']);

      $link = ish('section > a');
    });

    afterEach(function() {
      destroyDom();
    });

    it('should have forEach', function() {
      expect(typeof $link.forEach).toBe('function');
    });

    it('should loop', function() {
      var ctr = 0;
      $link.forEach(function() {
        ctr++;
      });
      expect(ctr).toBe(3);
    });

    it('should have each element passed to iterator', function() {
      $link.forEach(function(el, i) {
        expect(el[0]).toBe($link[i]);
      });
    });
  });
  // attr() tests
  describe("ish('selector').attr()", function() {

    var $div;

    beforeEach(function() {
      appendToDom('div');
      $div = ish('div');
      $div.attr('data-attr', 'test');
    });

    afterEach(function() {
      destroyDom();
    });

    it('node should have attributes', function() {
      expect($div.attr('data-attr')).toBe('test');
    });

    it('node should not have attribute value', function() {
      $div.attr('data-attr', '');
      expect($div.attr('data-attr')).toBe('');
    });

  });

  // ish.extend() tests
  describe('ish.extend(Object) ', function() {
    var defaults = {
      key: 'key value',
      key2: {
        key: 'key value',
        key2: 'key2 value',
        key3: {
          key: 'key value'
        }
      },
      key3: 'key3 value',
      key4: {
        key: 'key value',
        key2: {
          key: 'key value'
        }
      }
    };
    var newOptions = {
      key: 'new key value',
      key2: {
        key: 'new key value',
        key3: {
          key2: 'new key2 value'
        }
      },
      key5: 'new key5 value'
    };
    var extendedObject = ish.extend(defaults, newOptions);

    it('object should contain correct values', function() {
      expect(extendedObject.key).toBe('new key value');
      expect(extendedObject.key2.key).toBe('new key value');
      expect(extendedObject.key2.key2).toBe('key2 value');
      expect(typeof extendedObject.key2.key3).toBe('object');
    });
  });


  describe('ish.extend(Array)', function() {

    var defaultArray = [12,'hello',123,'yes', {key: 'value'}, [123,'value']];
    var newArray = [34,'goodbye',345,null, {key:'updated'}, [456, 'updated']];

    var extendedArray = ish.extend(defaultArray, newArray);

     it('should contain correct values', function() {
      expect(extendedArray[0]).toBe(34);
      expect(extendedArray[1]).toBe('goodbye');
      expect(extendedArray[2]).toBe(345);
      expect(extendedArray[3]).toBe('yes'); // null values are not merged
    });

    it('should merge nested Object', function() {
      expect(extendedArray[4].key).toBe('updated');
    });

    it('should merge nested Array', function() {
      expect(extendedArray[5][0]).toBe(456);
      expect(extendedArray[5][1]).toBe('updated');
    });

  });

  // nth()
  describe('ish.nth()', function() {
    var $link;

    beforeEach(function() {
      appendToDom('section', ['a']);
      appendToDom('section', ['a']);

      $link = ish('section > a').nth(1);

    });

    afterEach(function() {
      destroyDom();
    });

    it('length should be 1', function() {
      expect($link.length).toEqual(1);
    });

    it('should return on method', function() {

      expect(typeof $link.on).toBe('function');
    });

  });


  // indexOf()
  describe("ish('selector').indexOf()", function() {
    var $link;

    beforeEach(function() {
      appendToDom('section', ['a']);
      appendToDom('section', ['a']);

      $link = ish('section > a')[1];
      $link = ish('section > a').indexOf($link);
    });

    afterEach(function() {
      destroyDom();
    });

    it('should find node at index 1', function() {
      expect($link).toEqual(1);
    });

  });



  // height()
  describe("ish('selector').dimension()", function() {

    beforeEach(function(done) {
      getHTML('/base/tests/html/width-height.test.html', function(data) {
        if (data.error) console.log(data.error);
        done();
      });
    });

    afterEach(function() {
      destroyDom();
    });


    it('should have a height of 100px', function() {
      var $target = ish('.styled');
      expect($target.height()).toEqual(100);
    });

    it('inline - should have a height of 200px', function() {
      var $target = ish('.inline-styled');
      expect($target.height()).toEqual(200);
    });

    it('styled and padded should have a height of 120px', function() {
      var $target = ish('.styled-padded');
      expect($target.height()).toEqual(120);
    });

    it('inline and padded - should have a height of 240px', function() {
      var $target = ish('.inline-styled-padded');
      expect($target.height()).toEqual(240);
    });

    it('styled and margin should have a height of 120px', function() {
      var $target = ish('.styled-margin');
      expect($target.height(true)).toEqual(120);
    });

    it('inline and margin - should have a height of 240px', function() {
      var $target = ish('.inline-styled-margin');
      expect($target.height(true)).toEqual(240);
    });

    it('styled, padded  and margin should have a height of 140px', function() {
      var $target = ish('.styled-padded-margin');
      expect($target.height(true)).toEqual(140);
    });

    it('inline, padded  and margin - should have a height of 280px', function() {
      var $target = ish('.inline-styled-padded-margin');
      expect($target.height(true)).toEqual(280);
    });


    it('percentages - should have a height of 280px', function() {
      var $target = ish('.styled-percentage');
      expect($target.width(true)).toEqual(200);
    });



    // TODO, add clientHeight tests

  });

  // width()
  describe("ish('selector').width()", function() {

    beforeEach(function(done) {
      getHTML('/base/tests/html/width-height.test.html', function(data) {
        if (data.error) console.log(data.error);
        done();
      });
    });

    afterEach(function() {

      destroyDom();
    });


    it('should have a width of 200px', function() {
      var $target = ish('.styled');
      expect($target.width()).toEqual(200);
    });

    it('inline - should have a width of 100px', function() {
      var $target = ish('.inline-styled');
      expect($target.width()).toEqual(100);
    });

    it('styled and padded should have a width of 240px', function() {
      var $target = ish('.styled-padded');
      expect($target.width()).toEqual(240);
    });

    it('inline and padded - should have a width of 120px', function() {
      var $target = ish('.inline-styled-padded');
      expect($target.width()).toEqual(120);
    });

    it('styled and margin should have a width of 240px', function() {
      var $target = ish('.styled-margin');
      expect($target.width(true)).toEqual(240);
    });

    it('inline and margin - should have a width of 120px', function() {
      var $target = ish('.inline-styled-margin');
      expect($target.width(true)).toEqual(120);
    });

    it('styled, padded  and margin should have a width of 280px', function() {
      var $target = ish('.styled-padded-margin');
      expect($target.width(true)).toEqual(280);
    });

    it('inline, padded  and margin - should have a width of 140px', function() {
      var $target = ish('.inline-styled-padded-margin');
      expect($target.width(true)).toEqual(140);
    });


    // TODO, add clientHeight tests

  });


  // width()
  describe("ish('selector').css()", function() {
    beforeEach(function(done) {
      getHTML('/base/tests/html/width-height.test.html', function(data) {
        if (data.error) console.log(data.error);
        done();
      });
    });

    afterEach(function() {
      destroyDom();
    });

    it('should set style value', function() {
      var $target = ish('.styled');
      $target.css('height', '280px');
      expect($target.css('height')).toBe('280px');
    });

    it('should set style values as object', function() {
      var $target = ish('.styled');
      $target.css({
        width: '100px',
        color: '#000000'        
      });
      expect($target.css('width')).toBe('100px');
      expect($target.css('color')).toBe('rgb(0, 0, 0)');
    });

    it('should get style value', function() {
      var $target = ish('.styled-padded');
      expect($target.css('height')).toBe('100px');
      expect($target.css('paddingLeft')).toBe('20px');
      expect($target.css('paddingTop')).toBe('10px');

      var $targetOne = ish('.inline-styled');
      expect($targetOne.css('height')).toBe('200px');

    });

  });
  /*
  
  TODO: create these tests


  // offset()
  describe("ish('selector').offset()", function() {

  });



*/

});