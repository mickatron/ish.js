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
  /* Lib core
  ---------------------------------------*/
  //=require /src/js/ish.core.js
  //=require /src/js/ish.events.js

  /* Lib Optional Modules 
  ---------------------------------------*/
  ////=require /src/js/ish.ajax.js 
  ////=require /src/js/ish.class-modifiers.js 
  ////=require /src/js/ish.invoke.js

  ////=require /src/js/ish.tween.js 
  ////=require /src/js/ish.easing.js 

  ////=require /src/js/ish.responsive.js

  return $;

}(document, this);