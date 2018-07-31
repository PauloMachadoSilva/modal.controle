'use strict';

const gulp = require('gulp'),
    uncss = require('gulp-uncss');

// Remove unused CSS
gulp.task('uncss', () => {
    return gulp.src('dist/assets/css/style.min.css')
        .pipe(uncss({
            html: ['src/**/*.html']
        }))
        .pipe(gulp.dest('dist/assets/css/'));
});
