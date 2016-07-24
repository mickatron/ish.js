
## Installation
As the code base is still alpha Bower and NPM have not been setup just yet. For now you can clone the project using Git.

	// Git
	$ git clone
	// Bower
	//Coming Soon
	// NPM
	//Coming Soon

Then include the 'dist/ish.min.js' file on your HTML page and you're ready to go.

	<script type="text/javascript" src="/path/to/ish.min.js">
## ish.js Library Introduction
The ish.js library is a fork of Remy Sharps min.js. The most notable change in ish.js is that it does not include any methods on the `Node` or `NodeList` prototypes.

At its smallest distribution the Ish.js Library is less than 3k in size and around 2,000 chars(!), containing only 12 Methods which include an Event System and a handful of useful utility functions. Utilities for AJAX communication, class modifiers, animation... can also be found within the library.

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

## Getting Started with the library.
Just like jQuery the ish.js library uses the `ish('selector')` syntax to retrieve a collection of DOM nodes filtered by the selector provided as an argument. The returned value is similar to a jQObject, containing the collection of DOM Nodes, a few other pieces of information and some linked utility methods.

    // Cache an ishObject collection
    var collection = ish('selector');
        
    // There's a length property
    ish('selector').length; 
    
    // and also a selector property which refers to the first parameter passed into ish();
    ish('selector').selector;
	
  
To call an ishObject method is exactly the same as you would call a method in jQuery;

	ish('selector').attr(params);

You can also use native Javascript referencing the particular DOM node in the collection you wish to work on.

Collection items are pushed to the ishObject in the same order which `document.querySelectorAll()` returns them. You can find a particular Nodes index by using the `ish('selector').indexOf()` method available in the library, or select a particular node by index to be returned as an ishObject object using `ish('selector').nth()`.

	ish('selector')[0].style.display = 'none';

Utility methods which do not need a DOM node to work are called without the selector reference as below;

	ish.extends({a:'a'},{a:'new a'});


Check out the [ish][docish] and [ishObject][docishObj] documentation for available methods and their usage.

[docish]: http://ish.digitalfeast.com.au/js/docs/ish
[docishObj]: http://ish.digitalfeast.com.au/js/docs/ishObject