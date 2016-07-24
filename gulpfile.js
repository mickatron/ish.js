var gulp = require('gulp');
var del = require('del');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var include = require("gulp-include");
var jshint = require('gulp-jshint');
var karma = require('karma').Server;
var fileinclude = require('gulp-file-include');
var gulp = require('gulp');
var shell = require('gulp-shell');
var rename = require("gulp-rename");

var jsGlobs = ['**/*.js', '!node_modules/**/*.js', '!build/**/*.js', '!dist/**/*.js', '!docs/**/*.js', '!doc-template/**/*.js'];

var cleanFiles = ['dist/*', 'build/*', 'docs/*'];

gulp.task('cleanjs', function() {
  return del(cleanFiles);
});

gulp.task('lint', function() {
  gulp.src(jsGlobs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task("bundlejs", ['cleanjs'], function() {
  return gulp.src(["ish.js","ish.lite.js"])
    .pipe(sourcemaps.init())  // TODO: having issues with source maps
    .pipe(include())
    .pipe(sourcemaps.write('.')) // TODO: having issues with source maps
    .pipe(gulp.dest("dist"));
});

gulp.task('test', ['bundlejs'], function(done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function() {
    done();
  });
});

gulp.task('minifyjs', ['bundlejs'], function() {
  gulp.src(['dist/ish.js','dist/ish.lite.js'])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('docjs', ['bundlejs'], shell.task([
  'jsdoc -c conf.json ish.js'
]));

gulp.task('default', ['buildjs']);

gulp.task('buildjs', ['lint', 'docjs', 'test', 'minifyjs']);

gulp.task('builddev', ['lint', 'test', 'minifyjs']);

gulp.task('watch', function() {
  gulp.watch(jsGlobs, ['buildjs']);
});

gulp.task('watchdev', function() {
  gulp.watch(jsGlobs, ['builddev']);
});
