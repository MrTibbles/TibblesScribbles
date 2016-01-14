var
  gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  sourcemaps = require('gulp-sourcemaps'),
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
  gulpRemoveHtml = require('gulp-remove-html'),
  cleanhtml = require('gulp-cleanhtml'),
  htmlbuild = require('gulp-htmlbuild'),
  wiredep = require('wiredep').stream,
  del = require('del'),
  concat = require('gulp-concat'),
  util = require('gulp-util'),
  ngAnnotate = require('gulp-ng-annotate'),
  replace = require('gulp-replace'),
  argv = require('yargs').argv,
  cssmin = require('gulp-cssmin');

// Server - listed on localhost:8080
gulp.task('webserver', function() {

  var
    idnexUrl = argv.name ? 'static-' + argv.name + '.html' : '',
    serverOpts = {
      baseDir: ['app', '.tmp'],
      directory: false,
      index: idnexUrl
    };

  browserSync.init({
    notify: true,
    port: 3000,
    server: serverOpts,
    ghostMode: false,
    reloadDelay: 1000,
    open: 'external',
    online: true
  });
});

gulp.task('styles', function(cb) {
  return sass('app/styles/scss/main.scss', {
      sourcemap: true
    })
    .on('error', sass.logError)
    // For inline sourcemaps
    .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('.tmp/styles/'))
    .pipe(gulp.dest('app/styles/'))
    .pipe(notify({
      message: 'Styles task complete'
    }))
    .pipe(browserSync.stream());
});

gulp.task('lint', function() {
  return gulp.src('app/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src([
      'app/js/offers-landing-app.js',
      'app/js/controllers/parent-model-list-ctrl.js',
      'app/js/controllers/default-model-list-ctrl.js',
      'app/js/controllers/specific-model-list-ctrl.js',
      'app/js/controllers/finance-ctrl.js'
    ], {
      base: 'app/js/'
    })
    .pipe(concat('main.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Concatenate Angular files for tridion Component
gulp.task('misc', function(cb) {
  /*
  gulp.src(['app/bower_components/angular/angular.min.js', 'app/bower_components/angular-ui-router/release/angular-ui-router.min.js'], {
      base: 'app/bower_components/'
    })
    .pipe(concat('angDeps.min.js'))
    .pipe(gulp.dest('dist/js'));
  */

  var productionFiles = [
    './app/images/*'
  ];
  gulp.src(productionFiles, {
      base: './app'
    })
    .pipe(gulp.dest('dist/'));

  gulp.src('app/index.html')
    .pipe(cleanhtml())
    .pipe(gulp.dest('dist/'));

  del(['dist/styles/main.css'], cb);
  return gulp.src('app/styles/main.css')
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/styles/'));
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
  gulp.src('app/index.html')
    .pipe(htmlbuild({
      // build js with preprocessor 
      js: htmlbuild.preprocess.js(function(block) {
        block.write('js/model-offers.min.js');
        block.end();
      })
    }))
    .pipe(gulpRemoveHtml())
    .pipe(cleanhtml())
    // .pipe(replace('https://forms.toyota.co.uk/find-a-dealer?model=', '#/iframe/https://forms.toyota.co.uk/find-a-dealer?model='))    
    .pipe(gulp.dest('dist/'));

  var modelName = argv.name || 'undefined';
  if (typeof modelName !== 'undefined') {
    gulp.src('app/static-' + modelName + '.html')
      .pipe(gulpRemoveHtml())
      .pipe(cleanhtml())
      .pipe(gulp.dest('tridion-renders/'))
      .pipe(gulp.dest('dist/'))
      .pipe(notify({
        message: 'Model HTML copied to tridion-renders/'
      }))
  }
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
  return del(['dist/*'], cb);
});

// Watch
gulp.task('watch', ['webserver'], function() {

  gulp.watch([
    'app/*.html',
    'app/rest/*.json',
    'app/js/**/*.js'
  ], {
    debounceDelay: 2000
  }).on('change', reload);

  gulp.watch('app/images/*', ['images']).on('change', reload);

  gulp.watch('app/js/*', ['lint']).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']).on('change', reload);

});

gulp.task('default', ['watch']);

//gulp.task('build', ['clean', 'scripts', 'styles', 'buildHtml', 'misc']);
gulp.task('build', ['clean', 'styles', 'misc']);
