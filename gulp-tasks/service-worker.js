'use strict';

const gulp = require('gulp'),
    config = require('./config'),
    path = require('path'),
    swPrecache = require('sw-precache');

gulp.task('service-worker', function(callback) {
    var rootDir = global.isProd ? config.root.dist : config.root.tmp;

    swPrecache.write(path.join(rootDir, 'sw.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,woff,woff2,ttf,json}'],
        stripPrefix: rootDir,
        maximumFileSizeToCacheInBytes: 3097152
    }, callback);
});
