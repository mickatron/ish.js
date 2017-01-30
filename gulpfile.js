// NPM MODULES
var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var include = require("gulp-include");
var jshint = require('gulp-jshint');
var karma = require('karma').Server;
var fileinclude = require('gulp-file-include');
var shell = require('gulp-shell');
var rename = require("gulp-rename");
// Variables and Settings
var _srcGlobs = ['**/*.js', '!node_modules/**/*.js', '!dist/**/*.js', '!docs/**/*.js', '!doc-template/**/*.js'];
var _cleanGlobs = ['dist/*', 'docs/*'];
var _karmaConf = __dirname + '/karma.conf.js';
var _srcBuildFiles = ["ish.js","ish.lite.js"];
var _srcDest = 'dist';
var _minifyGlobs = _srcBuildFiles.map( function(x){ return './'+_srcDest+'/'+x; } );
var _srcBuildFileGlobs = _srcBuildFiles.map(function(x){ return './src/'+x;});

// TASKS
gulp.task('cleanjs', function() {
  return del(_cleanGlobs);
});

gulp.task('lint', function() {
  return  gulp.src(_srcGlobs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("bundlejs", ['cleanjs'], function() {
  return gulp.src( _srcBuildFileGlobs )
    //.pipe(sourcemaps.init())  // TODO: having issues with source maps
    .pipe(include())
    //.pipe(sourcemaps.write('.')) // TODO: having issues with source maps
    .pipe(gulp.dest(_srcDest));
});

gulp.task('test', ['bundlejs'], function(done) {
  karma.start({
    configFile: _karmaConf,
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('minifyjs', ['bundlejs'], function() {
  return gulp.src(_minifyGlobs)
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(_srcDest));
});


gulp.task('docjs', ['bundlejs'], shell.task([
  'jsdoc -c conf.json'
]));

gulp.task('default', ['buildjs']);
gulp.task('buildjs', ['lint', 'docjs', 'test', 'minifyjs']);
gulp.task('builddev', ['lint', 'test', 'minifyjs']);

gulp.task('watch', function() { gulp.watch(_srcGlobs, ['buildjs']); });
gulp.task('watchdev', function() { gulp.watch(_srcGlobs, ['builddev']); });
