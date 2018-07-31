module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'jasmine'
        ],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-carousel/dist/angular-carousel.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-format-masks/dist/format-masks.component.js',
            'node_modules/angular-i18n/angular-locale_pt-br.js',
            'node_modules/angular-input-masks/releases/angular-input-masks-standalone.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/angular-spinner/dist/angular-spinner.js',
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/@uirouter/core/_bundles/ui-router-core.js',
            'node_modules/@uirouter/angularjs/release/ui-router-angularjs.js',
            'node_modules/angulartics/dist/angulartics.min.js',
            'node_modules/angulartics-google-tag-manager/dist/angulartics-google-tag-manager.min.js',
            'node_modules/ngstorage/ngStorage.js',
            'node_modules/spin.js/spin.js',
            'node_modules/ua-parser-js/dist/ua-parser.pack.js',
            'node_modules/angular-resource/angular-resource.js',
            'node_modules/angular-br-filters/release/angular-br-filters.min.js',
            'node_modules/@celular/cd-directives/dist/cd.directives.js',
            'tests/specs/application.spec.js',
            'src/app/app.module.js',
            'src/**/*.js',
            'tests/specs/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            'src/assets/**/*',
            'src/app/app.run.js'
        ],

        // web server port
        port: 8081,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],
        //browsers: ['Chrome'],

        // Which plugins to enable
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-spec-reporter',
            'karma-coverage',
            'karma-jasmine',
            'karma-threshold-reporter',
            'karma-babel-preprocessor',
            'karma-junit-reporter'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage'],
            'src/pages/**/*.spec.js': ['babel'],
            'tests/**/*.js': ['babel']
        },
        // the configure thresholds
        thresholdReporter: {
            statements: 50,
            branches: 50,
            functions: 50,
            lines: 50
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'threshold', 'coverage', 'junit'],
        coverageReporter: {
            dir : 'tests/',
            reporters: [
               { type: 'html', subdir: 'coverage/' },
               { type: 'cobertura', subdir: '../coverage/', file: 'cobertura-coverage.xml' }
            ]
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015']
            },
            filename: function(file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function(file) {
                return file.originalPath;
            }
        },
        junitReporter: {
            outputDir: '',
            outputFile: 'tests.xml',
            suite: '',
            useBrowserName: false,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {},
            xmlVersion: null
        }

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
