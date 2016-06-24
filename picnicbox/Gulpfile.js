var
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  prefix = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  lr = require('tiny-lr'),
  server = lr(),
  gulpRemoveHtml = require('gulp-remove-html'),
  cleanhtml = require('gulp-cleanhtml'),
  htmlbuild = require('gulp-htmlbuild'),
  wiredep = require('wiredep').stream,
  del = require('del'),
  concat = require('gulp-concat'),
  util = require('gulp-util');

// Server - listed on localhost:8080
gulp.task('webserver', function() {

  browserSync.init({
    notify: true,
    port: 3000,
    server: './app',
    ghostMode: false,
    reloadDelay: 1000,
    open: 'external',
    online: true
  });
});

gulp.task('styles', function() {
  return gulp.src('app/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(gulp.dest('app/styles'))
    .pipe(notify({
      message: 'Styles task complete'
    }));
});

gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('main.min.js'))
    // .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('app/images'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

//Remove surplus HTML for production
gulp.task('buildHtml', function() {
  return gulp.src('app/index.html')
    .pipe(htmlbuild({
      // build js with preprocessor 
      js: htmlbuild.preprocess.js(function(block) {

        // read paths from the [block] stream and build them 
        // ...         
        // then write the build result path to it 
        block.write('js/main.min.js');
        block.end();
      })
    }))
    .pipe(gulpRemoveHtml())
    .pipe(cleanhtml())
    .pipe(gulp.dest('dist/'));
});

gulp.task('bower', function() {
  return gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: 'app/bower_components/',
      devDependencies: true
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('clean', function(cb) {
    return del(['dist/**'], cb);
});

gulp.task('move', function() {
  var productionFiles = [
    './app/styles/*.css',
    './app/index.html',
    './app/images/*'
  ];
  return gulp.src(productionFiles, {base: './app'})
    .pipe(gulp.dest('dist/'));
});

// Watch
gulp.task('watch', function() {

  gulp.watch([
    'app/index.html',
    // 'app/partials/*.html',
    'app/js/*.js',
    'app/images/*'
  ], {
    debounceDelay: 2000
  }).on('change', reload);

  gulp.watch('app/js/*', ['lint']).on('change', reload);

  gulp.watch('app/styles/scss/*.scss', ['styles']).on('change', reload);

});

gulp.task('default', ['webserver', 'watch']);

gulp.task('build', ['clean', 'scripts', 'styles', 'move']);
// gulp.task('build', ['clean']);
