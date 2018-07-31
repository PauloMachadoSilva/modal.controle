'use strict';

const gulp = require('gulp'),
    config = require('./config'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if');

// CD Modal Generate
gulp.task('modal', () => {
    return gulp.src(config.root.modal)
               .pipe(gulpif(global.isProd, uglify()))
               .pipe(global.isProd ? gulp.dest(config.paths.dist.modal) : gulp.dest(config.paths.tmp.modal));
});
