/*
 * Full Tutorial: http://ish.digitalfeast.com.au/js/docs/xxxxxxxxxx
 * 1. Install Gulp-Include: npm install gulp-include --save-dev
 * 2. Add Gulp task as described in tutorial
 * 3. Update file references below to point to the ish.js library files within your project. 
 * 4. Uncomment any required files as described in tutorial
 * 5. Run your Gulp task
 */


var ish = function(document, window, $) {
  'use strict';
  /* Lib Core
  ---------------------------------------*/
  //=require /js/ish.core.js
  //=require /js/ish.events.js

  /* Lib Optional
  ---------------------------------------*/
  //=require /js/ish.dimension.abstracts.js 
  //=require /js/ish.ajax.js 
  //=require /js/ish.forms.js 
  //=require /js/ish.class-modifiers.js
  //=require /js/ish.invoke.js 

  /* Lib Optional Components
  ---------------------------------------*/
  //!=include /js/ish.easing.js // just if you really need them
  //=include /js/ish.emitter.js
  //=include /js/ish.responsive.js
  //=include /js/ish.objects.js
  //=include /js/ish.store.js
  //=include /js/ish.render.js
  //=include /js/ish.router.js

  return $;

}(document, this);