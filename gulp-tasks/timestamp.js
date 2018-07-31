'use strict';

const gulp = require('gulp'),
    config = require('./config'),
    cachebust = require('gulp-cache-bust');

// Insert the timestamp of build at path of CSS and JS of Project
gulp.task('timestamp-assets', () => {
    return gulp.src(config.root.dist + 'index.html')
               .pipe(cachebust({
                   type: 'timestamp'
               }))
               .pipe(gulp.dest(config.root.dist));
});
