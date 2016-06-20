var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    package = require('./package.json'),
    nodemon = require('nodemon'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass');


gulp.task('bundle', function() {
    return browserify(package.paths.app)
        .transform('reactify',
            {
                stripTypes: true, es6: true
            })

        .bundle()
        .pipe(source(package.dest.app))
        .pipe(clean({force: true}))
        .pipe(gulp.dest(package.dest.dist));
});

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/css/'));
});
 
gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'],['bundle']);
    gulp.watch(['sass/**/*.scss'],['styles']);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www', ext: 'js jsx jade',ignore:["public/scripts/react/*"]
    });
});