const gulp = require('gulp-param')(require('gulp'), process.argv),
    nodemon = require('gulp-nodemon'),
    // babel = require('gulp-babel'),
    // uglify = require('gulp-uglify'),
    // del = require('del'),
    replace = require('gulp-replace'),
    fileExists = require('file-exists'),
    chalk = require('chalk'),
    rename = require("gulp-rename");

gulp.task('make', function (controller, model) {
    const make = (controller) ? controller : model;
    const makeStr = (controller) ? 'controller' : 'model';
    const indexChar = make.indexOf("/");
    const file = make.substr(indexChar + 1);
    const folder = make.substr(0, indexChar);
    const extraFile = makeStr + 's/' + make + '.js';

    if (fileExists(extraFile)) {
        console.log(chalk.red('Error: ' + make + ' already exist! Pls,try other name'));
    } else {
        gulp.src(['core/blueprint/' + makeStr + '.js'])
            .pipe(rename(file + '.js'))
            .pipe(replace(makeStr.toUpperCase(), file))
            .pipe(gulp.dest(makeStr + 's/' + folder));
        console.log(chalk.green('Generate ' + makeStr + ' Success'));
    }
});

gulp.task('serve', function () {
    nodemon({
        script: 'core/server.js'
        , ext: 'js html ts'
        , env: {'NODE_ENV': 'development'}
    })
});