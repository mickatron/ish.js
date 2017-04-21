// TODO: catch refreshes?.?.?
// TODO: 

(function(){
	var _historyAPI = window.history;

	function arrayFindString(str, strArray) {
		var matches = {
			values:[],
			index:[]
		};
	    for (var j=0; j<strArray.length; j++) {
	        if (strArray[j].match(str)) {
	        	matches.index.push(j);
	        	matches.values.push(strArray[j]);
	        }
	    }
	    if(matches.index.length) return matches;
	    return -1;
	}

	function callRouteFn(routeKey, slugs, stateData) {
		var routes = this.routes;
		if( routes.before ) routes.before( stateData );
		routes[routeKey].enter(slugs, stateData);
		if( routes.after ) routes.after( stateData );
	}

	// TODO: split this up in smaller more specific tasks - it's too large
	function parseURLroute (routeString, stateData){
		routeString = routeString || '';
		// get all the route keys
		var keys = Object.keys(this.routes);
		var routeKeys = [];
		var wildcardKeys = keys.filter(function(item){  
			if(item.substr(item.length -1) === '*') {
				return true;
			} else {
				routeKeys.push(item);
				return false;
			}
		});

		// test exact routes
		var exact = routeKeys.indexOf(routeString);
		var routeKey;

		if(exact >= 0) {
			routeKey =  routeKeys[exact];
		} else {
			// not exact
			var routeArray = routeString.split('/');
			routeArray.shift();
			var matches = arrayFindString(routeArray[0], routeKeys);
			var fnIndexMatches = matches.index;
			var fnKeyMatches = matches.values;
			
			// if theres more than one match refine by string comparison
			if(fnIndexMatches && fnIndexMatches.length > 1){
				var refineMatch = {
					index:[],
					values:[]
				}; 
				var mostPoints = 0;
				var mostSimilar;
				for (var i = 0; i < fnKeyMatches.length; i++) {
					var newArr = fnKeyMatches[i].split('/');
					newArr.shift();
					var points = 0;
					if( newArr.length === routeArray.length){
						for (var val = 0; val < newArr.length; val++) {
							if(newArr[val] === routeArray[val]){
								points++;
							}
							if(points > mostPoints) {
								mostPoints = points;
								mostSimilar = i;
							}
						}
					}
				}
				if(matches.index[mostSimilar]){
					refineMatch.index.push(matches.index[mostSimilar]);
					refineMatch.values.push(matches.values[mostSimilar]);
				}
				matches = refineMatch;
			}
			//console.log( 'routeString  ', routeString, matches);
			// only 1  match should exisit in the matches object by now.
			if(matches !== -1){
				if (matches.index.length === 0) { 
					this.routes.notFound(routeString);
					this.emit('ROUTE_NOT_FOUND', { route: routeString });
					return; 
				} else if (matches.index.length > 1) { 
					console.error('More than 1 route found'); 
				}

				// set the current slugs and the routeKey to call
				this.slugs = getSlugs(matches, routeArray); 
				routeKey = matches.values[0];
			}
		}

		
		
		if(this.current){
			// call previous onLeave handler
			var routeFnObj = this.routes[this.current];
			if(routeFnObj && routeFnObj.leave) routeFnObj.leave();
			// call previous onLeave handler for wildcards
			for (var e = 0; e < wildcardKeys.length; e++) {
				if(this.current.indexOf( wildcardKeys[e].replace('*','') ) === 0 ){
					var leaveFn = this.routes[ wildcardKeys[e] ].leave;
					if(leaveFn) leaveFn();
				}
			}
		}
		var returnVal;
		// test and call wildcards
		for (var d = 0; d < wildcardKeys.length; d++) {
			if(routeString.indexOf( wildcardKeys[d].replace('*','') ) === 0 ){
				callRouteFn.call(this, wildcardKeys[d], this.slugs, stateData);
				returnVal =  {route: wildcardKeys[d], previousRoute: this.current, slugs: this.slugs };
			}
		}

		if(routeKey){
			// call the single route found in the first tests
			callRouteFn.call(this, routeKey, this.slugs||null, stateData);
			returnVal =  {route: routeString, previousRoute: this.current, slugs: this.slugs };
		}
		this.current = routeString;
		return returnVal;
	}
	

	function getSlugs(matches, routeArray){
		var hasSlugs = false;
		// get any slug values 
		var splitMatchArray = matches.values[0].split('/');
		splitMatchArray.shift();
		//find slugs
		var slugs = {};
		for (var match = 1; match < splitMatchArray.length; match++) {
			// is it a slug? 
			var isSlug = splitMatchArray[match].charAt(0) + splitMatchArray[match].charAt(splitMatchArray[match].length-1);
			if(isSlug === '{}') {
				hasSlugs = true;
				// it's a slug!
				var slugName =  splitMatchArray[match].slice(1,-1);
				var slugValue = routeArray[match];
				slugs[slugName] = slugValue;
			}
		}
		return hasSlugs ? slugs : null;
	}

	function setState() {
		// store the state datat in localStorage, history.state has a 640kB limit.
		var stateString = JSON.stringify({data:$.store.data, states: $.store.states});
		localStorage.setItem(this.current, stateString);
	}

	$.fn.router = {
		/**
		 * Add a route to the router instance.
		 * @memberOf ish.router
		 * @param {String}   route The route path you're adding.
		 * @param {Object} fn    The routing object conatining 'enter' and 'leave' functions keyed by their respective name.
		 * @return {ish.router}       Chainable, returns its own instance.
		 */
		addRoute: function(route, fn){
			this.routes[route] = fn;
			return this;
		},
		/**
		 * Remove a route from the router instance.
		 * @param {String}   route The route path to remove.
		 * @return {ish.router}       Chainable, returns its own instance.
		 */
		removeRoute: function(route){
			delete this.routes[route];
			return this;
		},
		/**
		 * Flush/remove all routes from the router instance.
		 * @return {ish.router}       Chainable, returns its own instance.
		 */
		flushRoutes: function(){
			this.routes = {};
			return this;
		},
		/**
		 * Navigate to the specified route path.
		 * @param {String}   route The route path to remove.
		 * @return {ish.router}       Chainable, returns its own instance.
		 */
		navigate: function(route){
			setState.call(this); // set state of the current page
			var routeData = parseURLroute.call(this, route); // parse url route and switch pages
			_historyAPI.pushState(routeData, '', this.current);
			this.emit('ON_NAVIGATE', routeData);
			return this;
		},
		/**
		 * Destroy the router instance.
		 * @return {null}   
		 */
		destroy: function(){
			$(window).off('popstate', this.popHandler);
			return null;
		}
	};

	var popHandler = function(evt){
		setState.call(this);
		//get state
		var route;
		var stateData;
		if (history.state){
			var historyState = history.state;
			stateData = JSON.parse(localStorage.getItem(historyState.route));
			route = parseURLroute.call(this, historyState.route, stateData);
		} else {
			currentLocation = document.URL.replace(this.baseURL,'');
			route = parseURLroute.call(this, currentLocation);
		}
		this.emit('ON_POP', route);
		return stateData;
	};

	/**
	 * An application router.
	 * @name  ish.router
	 * @constructor
	 * @extends {ish.emitter}
	 * @param  {Object} options The utilities options object.
	 * @param  {String} options.baseURL The base URL of the application.
	 * @param  {Object} options.routes The routing object.
	 * @return {$.router}         The router instance
	 *
	 * @example
	 * var router = ish.router({ 
	 *		baseURL: 'http://ish.stateful.local',
	 *		routes: {
	 *			notFound: function(url){
	 *			},
	 *			before: function(history){
	 *			
	 *			},
	 *			after: function(history){
	 *			
	 *			},
	 *			'/':  {
	 *				enter: function(slugs, history){
	 *
	 *				},
	 *				leave: function(slugs, history){
	 *				}
	 *			}
	 *		}
	 * };
	 */
	$.router = function(options){
		var factory = Object.create($.fn.router);
		 factory = ish.extend({}, ish.emitter(), factory, options);
		var currentLocation = document.URL.replace(factory.baseURL,'');
		//console.log('currentLocation ',currentLocation,factory.baseURL);
		factory.popHandler = popHandler.bind(factory);
		$(window).on('popstate', factory.popHandler);
		//parses the inital route
		parseURLroute.call(factory, currentLocation);
		// add history state for the current page
		_historyAPI.replaceState({route: factory.current, slugs: factory.slugs }, "", factory.current);
		return factory;
	};

})();
