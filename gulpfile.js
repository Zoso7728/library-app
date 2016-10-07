var gulp = require('gulp');
var config = require('./gulp.config')();
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('style', function() {
  return gulp.src(config.jsFiles)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe($.jscs());
});

gulp.task('inject', function() {
  var wiredep = require('wiredep').stream;

  return gulp.src('./src/views/*.html')
    .pipe(wiredep(config.wiredepOptions))
    .pipe($.inject(gulp.src(config.injectSrc, {read: false}), config.injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function() {
  return $.nodemon(config.nodemonOptions)
    .on('restart', function(ev) {
      console.log('Restarting...');
    })
  ;
});
