// NPM MODULES
const gulp         = require('gulp');
const del          = require('del');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');
const include      = require("gulp-include");
const jshint       = require('gulp-jshint');
const karma        = require('karma').Server;
const fileinclude  = require('gulp-file-include');
const shell        = require('gulp-shell');
const rename       = require("gulp-rename");
const merge        = require('merge-stream');
const lazypipe     = require('lazypipe');

// Variables and Settings
const _srcGlobs = ['**/*.js', '!node_modules/**/*.js', '!dist/**/*.js', '!docs/**/*.js', '!doc-template/**/*.js'];
const _cleanGlobs = ['dist/*', 'docs/*'];
const _karmaConf = __dirname + '/karma.conf.js';
const _srcBuildFiles = ["ish.js", "ish.lite.js"];
const _srcDest = 'dist';
const _srcBuildFileGlobs = _srcBuildFiles.map(function(x){ return './src/'+x;});

function onError(err) {
  this.emit('end');
}

function processJS() {
  return lazypipe()
    // lint
    .pipe(jshint)
    .pipe(jshint.reporter, 'jshint-stylish')
    // bundle
    .pipe(include)
    .pipe(gulp.dest, _srcDest)
    // start map
    .pipe(sourcemaps.init)
    // minify
    .pipe(uglify)
    .pipe(rename,{
      suffix: '.min'
    })
    // map
    .pipe(sourcemaps.write, '.')();
}

// TASKS
gulp.task('clean', function() { return del(_cleanGlobs); });

gulp.task('js', function() { 
  var merged = merge();
  _srcBuildFileGlobs.forEach(function(file){
    merged.add(
      gulp.src(file)
      .pipe(processJS().on('error', onError))
      .pipe(gulp.dest(_srcDest))
    )
  });
  return merged;
});

gulp.task('test', ['js'], function(done) {
  karma.start({
    configFile: _karmaConf,
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('docjs', ['js'], shell.task([ 'jsdoc -c conf.json' ]));

gulp.task('build', ['js', 'test', 'docjs' ]);
gulp.task('builddev', ['js', 'test']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});

gulp.task('dev', ['clean'], function() {
  gulp.start('builddev');
});

gulp.task('watch', function() { gulp.watch(_srcGlobs, ['build']); });
gulp.task('watchdev', function() { gulp.watch(_srcGlobs, ['builddev']); });

