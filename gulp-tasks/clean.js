'use strict';

const gulp = require('gulp'),
    del = require('del'),
    config = require('./config');

// Task to delete the dev or production folder
gulp.task('clean', () => {
    return del(global.isProd ? config.root.dist : config.root.tmp);
});
