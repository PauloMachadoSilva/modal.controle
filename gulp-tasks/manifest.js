'use strict';

const gulp = require('gulp'),
    config = require('./config');

// Move the Manifest to dist folder
gulp.task('transfer-manifest', () => {
    return gulp.src(config.root.src + '/manifest.json')
               .pipe(gulp.dest(global.isProd ? config.root.dist : config.root.tmp));
});

