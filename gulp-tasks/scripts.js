'use strict';

const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    config = require('./config'),
    eslint = require('gulp-eslint'),
    gulpif = require('gulp-if'),
    ngAnnotate = require('gulp-ng-annotate'),
    server = require('./server'),
    reload = server.reload,
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

// Task to generate and concat carrentalz scripts
gulp.task('scripts', ['lint'], () => {
    return gulp.src(config.paths.src.allScripts)
               .pipe(sourcemaps.init())
               .pipe(concat('scripts.js'))
               .pipe(ngAnnotate())
               .pipe(gulpif(global.isProd, uglify()))
               .pipe(sourcemaps.write('.'))
               .pipe(gulp.dest(global.isProd ? config.paths.dist.js : config.paths.tmp.js))
               .pipe(reload({stream: true}));
});

// Task to generate and concat vendors scripts
gulp.task('scripts:vendors', () => {
    return gulp.src(config.paths.src.allVendors)
               .pipe(concat('vendors.js'))
               .pipe(gulpif(global.isProd, uglify()))
               .pipe(gulp.dest(global.isProd ? config.paths.dist.js : config.paths.tmp.js));
});
