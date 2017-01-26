const gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    jsObfuscate = require('gulp-javascript-obfuscator'),
    Cache = require('gulp-file-cache');

let cache = new Cache();

gulp.task('default', ['js', 'view', 'client']);

gulp.task('clear', () => {
    del(['.gulp-cache', 'dist']);
});

gulp.task('js', () => {
    let stream = gulp.src(['src/**', '!src/views/**', '!src/client/**'])
        .pipe(cache.filter()) // remember files
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(jsObfuscate())
        .pipe(cache.cache()) // cache them
        .pipe(gulp.dest('dist'));

    return stream; // important for gulp-nodemon to wait for completion
});

gulp.task('view', () => {
    let stream = gulp.src('src/views/**')
        .pipe(cache.filter()) // remember files
        .pipe(cache.cache()) // cache them
        .pipe(gulp.dest('dist/views'));

    return stream;
});

gulp.task('client', () => {
    let stream = gulp.src('src/client/**')
        .pipe(cache.filter()) // remember files
        .pipe(cache.cache()) // cache them
        .pipe(gulp.dest('dist/client'));
    return stream;
});

gulp.task('watch', ['default'], function () {
    let stream = nodemon({
        script: 'dist/server.js' // run ES5 code
        , watch: 'src' // watch ES2015 code
        , tasks: ['default'] // compile synchronously onChange
    });

    return stream
});

gulp.task('serve', function () {
    nodemon({
        script: 'server.js'
        , ext: 'js html pug'
        , env: { 'NODE_ENV': 'development' }
    })
});