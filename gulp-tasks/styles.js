'use strict';

const gulp = require('gulp'),
    concat = require('gulp-concat'),
    config = require('./config'),
    server = require('./server'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync'),
    reload = server.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

// Task to transform, SASS to CSS of carrentalz files, move and minify (if production build)
gulp.task('styles', () => {
    gulp.src('./src/styles/**/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulpif(global.isProd, cleanCss()))
        .pipe(sourcemaps.write('.'))
        .pipe(global.isProd ? gulp.dest(config.paths.dist.css) : gulp.dest(config.paths.tmp.css))
        .pipe(reload({stream: true}));
});

// Task to concat, move and minify (if production build) the vendors CSS files
gulp.task('styles:vendors', () => {
    return gulp.src(config.paths.src.assets.allVendorsCss)
               .pipe(concat('vendors.css'))
               .pipe(gulpif(global.isProd, cleanCss()))
               .pipe(gulp.dest(global.isProd ? config.paths.dist.css : config.paths.tmp.css));
});
