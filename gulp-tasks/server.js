'use strict';

const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    config = require('./config'),
    spa = require('browser-sync-spa'),
    reload = browserSync.reload,
    runSequence = require('run-sequence');

exports.reload = reload;

// Task to start a local server
gulp.task('serve', () => {
    browserSync.use(
        spa({
            selector: '[oi-controle]',
            history: {
                index: '/index.html'
            }
        })
    );

    browserSync.init({
        server: {
            baseDir: global.isProd ? config.root.dist : config.root.tmp,
            port: 3000,
            ui: {
                port: 3001
            },
            ghostMode: false,
            open: false
        }
    });

    gulp.watch(config.paths.src.assets.allSass, ['styles']);
    gulp.watch(config.paths.src.allScripts, ['scripts']);
    gulp.watch(config.paths.src.allHtmls, ['html']).on('change', browserSync.reload);
});

// Task to start a dev server
gulp.task('serve:dev', (done) => {
    global.isProd = false;
    runSequence('build:dev', 'serve', done);
});

// Task to start a hmg server
gulp.task('serve:hmg', (done) => {
    global.isProd = false;
    runSequence('build:hmg', 'serve', done);
});

// Task to start a hmg server
gulp.task('serve:hmgInterno', (done) => {
    global.isProd = false;
    runSequence('build:hmgInterno', 'serve', done);
});

// Task to simulate and start a production server
gulp.task('serve:prod', (done) => {
    global.isProd = true;
    runSequence('build:prod', 'serve', done);
});
