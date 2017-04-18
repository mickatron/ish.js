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
		it('', function() {
			var template = '<p ish-bind="textContent:text"></p>'
			var node = ish.renderTemplate(template, {text:'text has been rendered'});
			// you would usualy use ish.updateTemplate, this is just for exmaple
			ish.renderBind(ish(node), {text: 'text has been updated text'});
			expect(node.textContent).toEqual('text has been updated text');

		});
	});

});