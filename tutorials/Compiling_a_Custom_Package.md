## Compiling your own version with Gulp-Include

You many not need to use every component available. If you would like to compile your own version and you are using Gulp ish.js makes that pretty easy for you.

Firstly you will need to install Gulp-Include. 

	$ npm install gulp-include --save-dev

Then add an include task to your Gulp file

	var gulp    = require("gulp"),
	    include = require("gulp-include");
	 
	gulp.task("scripts", function() {
		console.log("-- gulp is running task 'scripts'");
		gulp.src("ish.custom.js")
			.pipe(include())
				.on('error', console.log)
			.pipe(gulp.dest("dist/js"));
	});
	 
	gulp.task("default", ["scripts"]


Next copy the /ish.custom.js file into your project and update the gulp.src parameter to reflect the new location. You can also change the destination folder include sourcemaps and more. Checkout the Gulp-Inluce npm page for more detail.

File references in your new ish.custom.js file will need to be updated to point to the location of the ish.js library files within your project.


### Adding/Removing Packages

Gulp-Include uses //=require and //=include directives. All of the files are referenced in the ish.custom.js file you just copied although some are commented out. Note that since Gulp-Include uses single line comments to start their directives double single quotes will prevent that directive from being executed. You can learn more over at the Gulp-Include NPM page.

	// This directive will be executed.
	//require path/to/file.js

	// This directive will not be executed.
	////require path/to/file.js

Once you are happy with the files being bundled run gulp and your newly compiled file should be ready to go.