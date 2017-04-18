describe('router', function() {
	'use strict';
	
	var router = ish.router({
		baseURL: 'http://ish.stateful.local',
		routes: {
			notFound: function(url){

			},
			before: function(history){
			
			},
			after: function(history){
			
			},
			'/test':  {
				enter: function(slugs, history){

				},
				leave: function(slugs, history){
				}
			},
			'/slugged/{slug}':  {
				enter: function(slugs, history){

				},
				leave: function(slugs, history){
				}
			},
			'/wildcard/*':  {
				enter: function(slugs, history){

				},
				leave: function(slugs, history){
				}
			}
		}
	}); 

	describe('finds correct path', function() {
		it('exact path', function() {
			router.navigate('/test');
			expect(router.current).toEqual("/test");
		});

		it('slugged path', function() {
			router.navigate('/slugged/123');
			expect(router.current).toEqual('/slugged/123');
			expect(router.slugs).toEqual( { slug : '123' } );

		});

		it('wildcard path', function() {

			router.navigate('/wildcard/something');
			expect(router.current).toEqual('/wildcard/something');
			
		});

		it('wildcard/slugged path', function() {

		});

		it('path not found', function() {
			router.navigate('/path/not/found');
			console.log(router.current);

		});


	});

});