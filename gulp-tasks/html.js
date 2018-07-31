'use strict';

const gulp = require('gulp'),
    config = require('./config'),
    gulpif = require('gulp-if'),
    htmlmin = require('gulp-htmlmin');

// Task To move and minify html files
gulp.task('html', () => {
    return gulp.src([config.paths.src.allHtmls, '!**/.index.html'])
               .pipe(gulpif(global.isProd, htmlmin({collapseWhitespace: true, minifyCSS: true})))
               .pipe(global.isProd ? gulp.dest(config.root.dist) : gulp.dest(config.root.tmp));
});
