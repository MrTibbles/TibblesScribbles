var
    gulp = require('gulp'),
    webserver = require('gulp-webserver'),
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
    connect = require('gulp-connect'),
    lr = require('tiny-lr');

gulp.task('styles', function() {
    return gulp.src('app/styles/scss/main.scss')
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('app/js'))
        .pipe(rename('gallery-slider.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

// Images
gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({
            message: 'Images task complete'
        }));
});

// Watch
gulp.task('watch', function() {

    var serverOpts = {
        baseDir: 'app',
        // directory: true
    }

    browserSync.init({
        notify: true,
        port: 3000,
        server: serverOpts,
        ghostMode: false,
        reloadDelay: 1000,
        open: 'external',
        online: true
    });

    gulp.watch([
        'app/index.html',
        'app/js/*.js',
        'app/images/*'
    ], {
        debounceDelay: 2000
    }).on('change', reload);

    gulp.watch('app/styles/scss/*.scss', ['styles']).on('change', reload);

});

gulp.task('default', ['watch']);

gulp.task('build', ['scripts', 'styles', 'images']);
