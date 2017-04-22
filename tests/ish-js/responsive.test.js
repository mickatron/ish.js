describe('responsive:', function() {
	'use strict';
	var spy = jasmine.createSpy('spy');
	var mediaBreaks = ish.responsive({
		breakpoints: [{
			name: 'mobile',
			width: 0
		}, {
			name: 'tablet',
			width: 640
		}, {
			name: 'desktop',
			width: 1024
		}],
		eventPrefix: 'ish.responsive'
	});
	
	mediaBreaks.subscribe('onMediaBreak', spy);

	// function(data){ console.log('Media break: ',data.name); }

	it('should call handler on invocation', function(){
		expect(mediaBreaks.break).toEqual('mobile');
	});

	it('can add breaks', function(){
		mediaBreaks.add({
			name: 'large',
			width: 1100
		})
		var foundNew = false;
		mediaBreaks.breakpoints.forEach(function(el){
			if(el.name === large) {
				foundNew = true;
			}
		});
		expect(foundNew).toEqual(true);
	});

});	