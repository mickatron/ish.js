
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
    
    //  Responsive Breakpoint Component.
    $.responsive(options);
    
    // Tweening & Easing Components.
    $.tween(options);

## Tutorials
 - [Getting Started][tut1]
 - [Compiling a custom Ish.js package][tut2]
 - (Coming soon) Using the Responsive Utility
 - (Coming soon) Using the Tween Utility

## Documentation
[Visit the full documentation][docs].

## Immediate To-dos;

 -  Tween class is very verbose to use, I like its flexibility but I'm really missing the simplicity and ease of jQuery's animate().
 -  Tweens are not super smooth at certain settings, particulary longer time frames.
 -  Error reporting. There is none at the moment.
 -  Improved Documentation and Theme   
 -  Improved testing
 -  Improved Aajx functionality 

 
 [docs]: http://ish.digitalfeast.com.au/js/docs
 [tut1]: http://ish.digitalfeast.com.au/js/docs/tutorial-getting_started.html
 [tut2]: http://ish.digitalfeast.com.au/js/docs/tutorial-Compiling_a_Custom_Package.html



