describe('render:', function() {
	'use strict';
	
	describe('$.renderTemplate() && $.updateTemplate()', function() {

		var template = '<div><p ish-bind="textContent:text className:class"></p></div>';
		var templateData = {text: 'Text has been rendered.', class: 'someClassName'};
		var templatedNode = ish.renderTemplate(template, templateData);
		
		it('should contain bound textContent and className', function() {	
			expect(ish('p',templatedNode).hasClass('someClassName')).toEqual(true);
			expect(ish('p',templatedNode)[0].textContent).toEqual('Text has been rendered.');
		});
		it('should contain updated bound textContent and className', function() {
			ish.updateTemplate(templatedNode, {text: 'Text has been updated.', class: 'someUpdatedClassName'});	
			expect(ish('p',templatedNode).hasClass('someUpdatedClassName')).toEqual(true);
			expect(ish('p',templatedNode)[0].textContent).toEqual('Text has been updated.');
		});

	});

	describe('$.renderBind()', function() {
		it('should render a bind on an exisiting DOM Node', function() {
			var template = '<p ish-bind="textContent:text"></p>'
			var node = ish.renderTemplate(template, {text:'text has been rendered'});
			// you would usualy use ish.updateTemplate, this is just for exmaple
			ish.renderBind(ish(node), {text: 'text has been updated text'});
			expect(node.textContent).toEqual('text has been updated text');

		});
	});

	describe('$.bindToObject()', function() {
		beforeEach(function(done) {
			getHTML('/base/tests/html/form-bind.test.html', function(data) {
				if (data.error) console.log(data.error);
				done();
			});
		});

		afterEach(function() {
			destroyDom();
		});


		it('should bind values', function() {
			var obj = {};
			var form = ish('[user-form]');
			ish('input, textarea', form).forEach(function($el){
				ish.bindToObject($el, obj);
			});
			ish('input[type="radio"][checked]').forEach(function($el){
				ish.bindToObject($el, obj);
			});

			ish('select').forEach(function($el){
				var selected = ish('option[selected]', $el);
				//console.log('selected ',selected);
				//if(selected)  // ish.bindToObject(selected, obj);
			});

			expect(obj.name).toEqual('John Smith');
			expect(obj.email).toEqual('john@smith.com');
			expect(obj.textarea).toEqual('text area value');

			expect(obj.gender).toEqual('male');

			console.log("bound obj values ",obj);
		});

	});

});