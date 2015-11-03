var
  gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  lr = require('tiny-lr'),
  server = lr();

// Server - listed on localhost:8080
gulp.task('webserver', function() {
  gulp.src('app/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true
    }));
  // connect.server();
});

gulp.task('styles', function() {
  return gulp.src('app/styles/scss/main.scss')
  .pipe(sass({ style: 'expanded' }))
  .pipe(autoprefixer('last 2 version'))
  .pipe(gulp.dest('app/styles'))
  .pipe(notify({ message: 'Styles task complete' }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('app/js'))
    .pipe(rename('gallery-slider.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app'));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('app/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/js/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Create LiveReload server
  var server = livereload();

  // Watch any files in dist/, reload on change
  gulp.watch(['styles/**','js/**','images/**','*.html']).on('change', function(file) {
    server.changed(file.path);
  });

});

gulp.task('default', ['webserver','styles', 'scripts', 'watch']);