
// TODO: consider onBeforeLeave and state

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
			routes[routeKey](slugs, stateData);
			if( routes.after ) routes.after( stateData );
	}

	function parseURLroute (routeString, stateData){
		routeString = routeString || '';

		var routeKeys = Object.keys(this.routes);
		var exact = routeKeys.indexOf(routeString);
		var routeKey;
		var slugs = null;

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
			if(fnIndexMatches.length > 1){
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
			if (matches.index.length === 0) { 
				this.routes.notFound(routeString);
				this.emit('ROUTE_NOT_FOUND', { route: routeString });
				return; 
			} else if (matches.index.length > 1) { 
				console.error('More than 1 route found'); 
			}

			// get any slug values 
			var splitMatchArray = matches.values[0].split('/');
			splitMatchArray.shift();
			//find slugs
			slugs = {};
			for (var match = 1; match < splitMatchArray.length; match++) {
				// is it a slug? 
				var isSlug = splitMatchArray[match].charAt(0) + splitMatchArray[match].charAt(splitMatchArray[match].length-1);
				if(isSlug === '{}') {
					// it's a slug!
					var slugName =  splitMatchArray[match].slice(1,-1);
					var slugValue = routeArray[match];
					slugs[slugName] = slugValue;
				}
			}
			// add to the history
			this.current = routeString;
			this.slugs = slugs;
			
			console.log('call route mthod ',this.routes.before);
			// lastly call the method 
			routeKey = matches.values[0];
		}

		callRouteFn.call(this, routeKey, slugs, stateData);

		return { route: routeString, slugs: slugs };
	}

	$.fn.router = {
		add: function(route, fn){
			this.routes[route] = fn;
			return this;
		},
		remove: function(route){
			delete this.routes[route];
			return this;
		},
		flush: function(){
			this.routes = {};
			return this;
		},
		navigate: function(route){
			console.log('navigate');
			var previous = this.current;
			// parse url route
			var routeData = parseURLroute.call(this, route);
			// store the state datat in localStorage, history.state has a 640kB limit.
			var stateString = JSON.stringify({data:$.store.data, state: $.store.states});
			localStorage.setItem(previous, stateString);

			_historyAPI.replaceState(routeData, "", previous);

			this.emit('ROUTE_NAVIGATE', routeData);
			return this;
		},
		destroy: function(){
			$(window).off('popstate', this.popHandler);
			return null;
		}
	};

	$.router = function(options){
		var factory = Object.create($.fn.router);
		ish.extend(factory, ish.emitter(), options);
		console.log('route ', options, factory);
		var currentLocation = document.URL.replace(factory.baseURL,'');
		//console.log('currentLocation ',currentLocation,factory.baseURL);
		factory.popHandler = $(window).on('popstate', function(evt){
			//get state
			console.log('onPop');
			var route;
			var stateData;
			if (history.state){
				var historyState = JSON.parse(history.state);
				stateData = localStorage.getItem(historyState.route);
				route = parseURLroute.call(factory, historyState.route, stateData);
			} else {
				currentLocation = document.URL.replace(factory.baseURL,'');
				route = parseURLroute.call(factory, currentLocation);
			}
			factory.emit('ROUTE_POP', route);
			return stateData;
		});
		console.log('route ',currentLocation, options, factory);
		// get the current url
		//parses the inital route
		//parseURLroute.call(factory, currentLocation);
		return factory;
	};

})();
