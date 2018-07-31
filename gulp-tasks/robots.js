'use strict';

const gulp = require('gulp'),
    config = require('./config');

// Move the robots file to dist folder
gulp.task('transfer-robots', () => {
    return gulp.src(config.root.src + '/robots.txt')
               .pipe(gulp.dest(global.isProd ? config.root.dist : config.root.tmp));
});
