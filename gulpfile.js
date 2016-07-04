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
    fs = require('fs'),
    print = require('gulp-print'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

var getIncludesByType = function(type) {
    var allIncludes = [];
    var data = fs.readFileSync('./public/static/posts.json', 'utf8');

    var posts = JSON.parse(data).posts;
    var post;
    for(var i=0; i<posts.length; i++) {
        post = posts[i];
        var includes = post.includes;
        if(!!includes) {
            includes = includes
                .filter(function(include) {
                    if(include.type == type) {
                        return true;
                    }

                    return false;
                }).map(function(include) {
                    return './public' + include.path;
                });

            allIncludes = allIncludes.concat(includes);
        }
    }

    return allIncludes;
};

gulp.task('jsIncludes', function() {
    var allIncludes = getIncludesByType('js');

    return gulp.src(allIncludes)
        .pipe(print())
        //.pipe(uglify())
        .pipe(concat('includes.js'))
        .pipe(gulp.dest('./public/scripts'));

});


gulp.task('react', function() {
    return browserify(package.paths.app)
        .transform('reactify',
            {
                stripTypes: true, es6: true
            })
        .bundle()
        .pipe(source(package.dest.app))
        .pipe(clean({force: true}))
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        //.pipe(uglify()) // now gulp-uglify works
        .pipe(gulp.dest(package.dest.dist));
});

gulp.task('bundle', ['react', 'jsIncludes']);

gulp.task('cssIncludes', function() {
    var allIncludes = getIncludesByType('css');

    return gulp.src(allIncludes)
        .pipe(print())
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(concat('includes.min.css'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('appStyles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('styles',['appStyles', 'cssIncludes']);

gulp.task('build-all', ['bundle', 'styles']);

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx', 'public/static/**/*.js', 'app.js', 'config.js'],['bundle']);
    gulp.watch(['sass/**/*.scss', 'public/static/**/*.css'],['styles']);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www', ext: 'js jsx jade',ignore:["public/scripts/react/*"]
    });
});