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

var jsGlobs = ['**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!dist/**/*.js', '!docs/**/*.js', '!doc-template/**/*.js'];
var cleanFiles = ['dist/*', 'build/*', 'docs/*'];
var _karmaConf = __dirname + '/karma.conf.js';
var _src = ["ish.js","ish.lite.js"];
var _srcDest = 'dist';
var _minifyGlobs = function(){
  var arr = [];
  for (var i = _src.length - 1; i >= 0; i--) {
    arr.push( _srcDest +"/"+ _src[i] );
  }
  return arr;
}();


gulp.task('cleanjs', function() {
  return del(cleanFiles);
});

gulp.task('lint', function() {
  return  gulp.src(jsGlobs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("bundlejs", ['cleanjs'], function() {
  return gulp.src(_src)
    .pipe(sourcemaps.init())  // TODO: having issues with source maps
    .pipe(include())
    .pipe(sourcemaps.write('.')) // TODO: having issues with source maps
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
  'jsdoc -c conf.json ish.js'
]));

gulp.task('default', ['buildjs']);
gulp.task('buildjs', ['lint', 'docjs', 'test', 'minifyjs']);
gulp.task('builddev', ['lint', 'test', 'minifyjs']);

gulp.task('watch', function() { gulp.watch(jsGlobs, ['buildjs']); });
gulp.task('watchdev', function() { gulp.watch(jsGlobs, ['builddev']); });
