
Ish.js(Alpha) is a super tiny Javascript library with a jQuery'ish syntax. [Visit the full documentation][docs].

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

Install with Git, NPM or Yarn. 

    // Git
    $ git clone https://github.com/mickatron/ish.js.git
    // NPM
    $ npm i -D ish.js
    // Yarn
    $ yarn add ish.js --dev


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
This is not a full list, please see the full [documentation][docs] for all availiable methods.

    // AJAX
    ish.ajax();
    
    // ish().dimension Abstracts
    ish('selector').width();
    ish('selector').height();
    
    // Classname Utils.
    ish('selector').hasClass();
    ish('selector').addClass();
    ish('selector').removeClass();
    
    //Responsive Util
    ish.responsive();
    //Routing
    ish.router();
    // Templating/rendering
    ish.renderTemplate()
    ish.updateTemplate()
    ish.renderBind()
    // State/Store
    ish.store
    



## Tutorials
 - [Getting Started][tut1]
 - [Compiling a custom Ish.js package][tut2]
 - (Coming soon) Using the Responsive Utility
 - (Coming soon) Using the Tween Utility

## Documentation
[Visit the full documentation][docs]

## Immediate To-dos;

 -  Error reporting.
 -  Improved Documentation and Theme   
 -  Improved testing
 -  A few todo's listed in the responsive component

 
 [docs]: http://ish.digitalfeast.com.au/js/docs
 [tut1]: http://ish.digitalfeast.com.au/js/docs/tutorial-Getting_Started.html
 [tut2]: http://ish.digitalfeast.com.au/js/docs/tutorial-Compiling_a_Custom_Package.html



