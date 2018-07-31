'use strict';

const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    config = require('./config');

// Compress Images and move to dist folder
gulp.task('images', () => {
    return gulp.src(config.paths.src.assets.allImages)
               .pipe(imagemin())
               .pipe(global.isProd ? gulp.dest(config.paths.dist.images) : gulp.dest(config.paths.tmp.images));
});
