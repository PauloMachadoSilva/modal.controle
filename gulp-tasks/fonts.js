'use strict';

const gulp = require('gulp'),
    config = require('./config');

// Task to move the fonts to environment
gulp.task('fonts', () => {
    return gulp.src(config.paths.src.assets.allFonts)
               .pipe(global.isProd ? gulp.dest(config.paths.dist.fonts) : gulp.dest(config.paths.tmp.fonts));
});
