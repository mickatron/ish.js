describe('router', function() {
	'use strict';
	var router;
	beforeEach(function() {
		router = ish.router({
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
				},
				'/wildcard/{slug}/*':  {
					enter: function(slugs, history){

					},
					leave: function(slugs, history){
					}
				}
			}
		});
	});  

	it('can add() path', function() {
		router.addRoute('/addedPath',  {
			enter: function(slugs, history){

			},
			leave: function(slugs, history){
			}
		});
		expect(typeof router.routes['/addedPath']).toEqual('object');
		expect(typeof router.routes['/addedPath'].enter).toEqual('function');
		expect(typeof router.routes['/addedPath'].leave).toEqual('function');
		
	});


	it('can remove() path', function() {
		router.removeRoute('/addedPath');
		expect(router.routes['/addedPath']).toBe(undefined);
	});

	it('can flush() paths', function() {
		router.flushRoutes();
		expect(router.routes).toEqual({});
	});

	it('can destroy() instance', function() {
		router = router.destroy();
		expect(router).toEqual(null);
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
			router.navigate('/wildcard/123/something');
			expect(router.current).toEqual('/wildcard/123/something');
			expect(router.slugs).toEqual( { slug : '123' } );

		});

		it('path not found', function() {
			router.navigate('/path/not/found');
			console.log(router.current);

		});
	});




});