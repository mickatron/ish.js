var ish = function(document, window, $) {
	'use strict';
	/* Lib Core
	---------------------------------------*/
	//=include /js/ish.core.js
	//=include /js/ish.events.js

	/* Lib Optional
	---------------------------------------*/
	//=include /js/ish.dimension.abstracts.js 
	//=include /js/ish.ajax.js
	//=include /js/ish.class-modifiers.js
	//=include /js/ish.invoke.js // Deprecated, extra optional. needs removal before beta

	/* Lib Optional Components
	---------------------------------------*/
	//=include /js/ish.easing.js // just if you really need them
	//=include /js/ish.emitter.js
	//=include /js/ish.responsive.js
	//=include /js/ish.objects.js
	//=include /js/ish.state.js
	//=include /js/ish.render.js
	//=include /js/ish.router.js

	return $;

}(document, this); 