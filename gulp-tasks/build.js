'use strict';

const gulp = require('gulp'),
    runSequence = require('run-sequence');

// Task to build dev environment
gulp.task('build:dev', (done) => {
    global.isProd = false;
    _executeSequence(done);
});

// Task to build hmg environment
gulp.task('build:hmg', (done) => {
    global.isProd = false;
    _executeSequence(done);
});

// Task to build hmg client environment
gulp.task('build:hmgInterno', (done) => {
    global.isProd = false;
    _executeSequence(done);
});

// Task to build production environment
gulp.task('build:prod', (done) => {
    global.isProd = true;
    _executeSequence(done);
});

// function to execute runSequence
function _executeSequence(done) {
    return runSequence(
        'clean',
        'lint',
        'styles',
        'styles:vendors',
        'scripts',
        'scripts:vendors',
        ['fonts', 'images', 'html'],
        'transfer-manifest',
        'transfer-robots',
        'service-worker',
        'timestamp-assets',
        done
    );
};
