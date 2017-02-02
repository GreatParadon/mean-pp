const gulp = require('gulp-param')(require('gulp'), process.argv),
    nodemon = require('gulp-nodemon'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename");

gulp.task('make', function (controller, model) {
    if (controller) {
        let indexController = controller.indexOf("/");
        let subStrController = controller.substr(indexController + 1);
        let subStrFolder = controller.substr(0, indexController);
        gulp.src(['core/blueprint/controller.js'])
            .pipe(rename(subStrController + '.js'))
            .pipe(replace('Controller', subStrController))
            .pipe(gulp.dest('controllers/' + subStrFolder));
        console.log('Create ' + controller + ' Success');
    } else {
        let indexModel = model.indexOf("/");
        let subStrModel = model.substr(indexModel + 1);
        let subStrFolder = model.substr(0, indexModel);
        gulp.src(['core/blueprint/model.js'])
            .pipe(rename(subStrModel + '.js'))
            .pipe(replace('Model', subStrModel))
            .pipe(gulp.dest('models/' + subStrFolder));
        console.log('Create ' + model + ' Success');
    }
});

gulp.task('serve', function () {
    nodemon({
        script: 'core/server.js'
        , ext: 'js html ts'
        , env: {'NODE_ENV': 'development'}
    })
});