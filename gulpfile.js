// NPM MODULES
const gulp         = require('gulp');
const del          = require('del');
const concat       = require('gulp-concat');
const sourcemaps   = require('gulp-sourcemaps');
const uglify       = require('gulp-uglify');
const include      = require("gulp-include");
const jshint       = require('gulp-jshint');
const karma        = require('karma').Server;
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


// RELEASE TASKS
const bump      = require('gulp-bump');
const gutil     = require('gulp-util');
const git       = require('gulp-git');
const runSequence   = require('run-sequence');
const fs      = require('fs');


// $ gulp release --type (major || minor || patch)
gulp.task('release', function(callback) {
runSequence(
    'bump-version',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    //'github-release',
    function (error) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
      }
      callback(error);
    });
});

gulp.task('bump-version', function () {
  var type = gutil.env.type || "patch";
  console.log('Release patch type: ', type);
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
  return gulp.src(['./package.json'])
    .pipe(bump({type: type}).on('error', gutil.log))
    .pipe(gulp.dest('./'));
});

gulp.task('commit-changes', function () {
  return gulp.src('.')
    //.pipe(git.add())
    .pipe(git.commit('[Prerelease] Bumped version number'));
});

gulp.task('push-changes', function (cb) {
  git.push('origin', 'master', cb);
});

gulp.task('create-new-tag', function (cb) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function (error) {
    if (error) {
      return cb(error);
    }
    git.push('origin', 'master', {args: '--tags'}, cb);
  });

  function getPackageJsonVersion () {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});