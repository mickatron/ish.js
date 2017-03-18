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

	function parseURLroute (routeString){
		var routeKeys = Object.keys(this.routes);
		var exact = routeKeys.indexOf(routeString);
		if(exact >= 0) {
			this.routes[routeKeys[exact]]();
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
				console.warn('Route Not Found');
				this.emit('ROUTE_NOT_FOUND', { route: routeString });
				return; 
			} else if (matches.index.length > 1) { 
				console.error('More than 1 route found'); 
			}

			// get any slug values 
			var splitMatchArray = matches.values[0].split('/');
			splitMatchArray.shift();
			//find slugs
			var slugObject = {};
			for (var match = 1; match < splitMatchArray.length; match++) {
				// is it a slug? 
				var isSlug = splitMatchArray[match].charAt(0) + splitMatchArray[match].charAt(splitMatchArray[match].length-1);
				if(isSlug === '{}') {
					// it's a slug!
					var slugName =  splitMatchArray[match].slice(1,-1);
					var slugValue = routeArray[match];
					slugObject[slugName] = slugValue;
				}
			}
			// add to the history
			console.log(routeString);
			_historyAPI.pushState({}, "", routeString);
			this.current = routeString;
			this.slugs = slugObject;
			this.emit('ROUTE_NAVIGATE', { route: routeString, slugs: slugObject });
			// lastly call the method 
			return this.routes[matches.values[0]](slugObject);
		}
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
			// parse url route
			var route = parseURLroute.call(this, route);

			return this;
		},
		destroy: function(){

			return null;
		}
	};

	$.router = function(options){
		var factory = Object.create($.fn.router);
		ish.extend(factory, ish.emitter(), options);

		return factory;
	};

})();
