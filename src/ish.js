/** 
 * 
 * @author Michael Hargreaves <code@digitalfeast.com.au>
 * @version 0.0.1 (alpha)
 * @license MIT
 *
 * @fileoverview 


Ish.js is a super tiny Javascript library with a jQuery'ish syntax. [Visit the full documentation][docs].

## Distributed files

There's two compiled files available in the dist folder.

 -   `ish.lite.min.js` is around 3KB and includes only the ish.core.js and ish.events.js methods. Minified it weighs in just under 3KB.
 -   `ish.min.js` weighs in at around 8kb and incldes all Ish.js library methods.

### Compiling a custom version

See the 'Compiling a Custom Package Tutorial'.

## Browser Support

 -   IE9+
 -   Firefox
 -   Chrome
 -   Safari

## Mobile Support
TBA

## Installation &amp; Quick Start

Install with Git, Bower or NPM. 

    // Git
    $ git clone https://github.com/mickatron/ish.js.git
    // Bower
    //Coming Soon
    // NPM
    //Coming Soon

Then include the 'dist/ish.min.js' file on your html page and you're ready to go.

    <script type="text/javascript" src="/path/to/ish.min.js">

## Core Methods

    // querySelectorAll based Selector Engine.
    ish('selector','context');
    
    // Selector Engine Utilities.
    ish('selector').nth();
    ish('selector').indexOf();
    ish('selector').forEach();
    
    // Basic Utils.
    ish('selector').attr();
    ish('selector').css();  
    ish('selector').offset();  
    ish('selector').dimension();
    
    // Event Methods.
    ish('selector').on();
    ish('selector').off();
    ish('selector').trigger();
    
    // Library Utils.
    ish.extends();

## Optional Methods

    // AJAX
    ish.ajax();
    
    // ish().dimension Abstracts
    ish('selector').width();
    ish('selector').height();
    
    // Classname Utils.
    ish('selector').hasClass();
    ish('selector').addClass();
    ish('selector').removeClass();
    
    // Watchable Object
    $.watchable(Object);
    // observable Object and Array
    $.observable();

## Tutorials
 - [Getting Started][tut1]
 - [Compiling a custom Ish.js package][tut2]
 - (Coming soon) Using the Responsive Utility
 - (Coming soon) Using the Tween Utility

## Documentation
[Visit the full documentation][docs].

## Immediate To-dos;

 -  Error reporting.
 -  Improved Documentation and Theme   
 -  Improved testing
 -  A few todo's listed in the responsive component

 
 [docs]: http://ish.digitalfeast.com.au/js/docs
 [tut1]: http://ish.digitalfeast.com.au/js/docs/tutorial-Getting_Started.html
 [tut2]: http://ish.digitalfeast.com.au/js/docs/tutorial-Compiling_a_Custom_Package.html





 */


/**
 * @license
 * Copyright (c) 2016 Michael Hargreaves.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */




/**
 * @namespace ish
 * @description A jQuery'ish set of utility methods. There is very few methods available under this namespace, the ish('selector') will by far be the most commonly used method. You'll also find an extends method and an optional AJAX utility.
 * @example
(function($){
	// now you can use the $ sign in place of ish just as you would using jQuery.
	// Let's start by grabbing a reference to a DOM node with the selector engine
	var $element = $('selector');
	// now we'll add the attribute 'data-ish' with a property of 'true'
	$element.attr('data-ish','true');

	var obj1 = {a:'a'};
	var obj2 = {a:'new a', b:'b'};
	$.extend(obj1,obj2);
})(ish);
 */
var ish = function(document, window, $) {
	//'use strict';
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
	//!=include /js/ish.easing.js // just if you really need them
	//=include /js/ish.emitter.js
	//=include /js/ish.responsive.js
	//=include /js/ish.objects.js
	//=include /js/ish.store.js
	//=include /js/ish.render.js
	//=include /js/ish.router.js

	return $;

}(document, this); 