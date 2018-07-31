'use strict';

const root = exports.root = {
    assets: 'src/assets',
    dist: 'dist',
    src: 'src',
    test: 'test',
    tmp: '.tmp'
};

exports.server = {
    browser: require('os').platform() === 'win32' ? 'chrome' : 'google chrome',
    mainHTML: root.src + '/index.html',
    port: 3000,
    uri: 'http://localhost:3000/login'
};

exports.paths = {
    base: __dirname.replace(require('path').basename(__dirname), ''),
    dist: {
        css: root.dist + '/assets/css/',
        fonts: root.dist + '/assets/fonts/',
        images: root.dist + '/assets/images/',
        js: root.dist + '/assets/js/'
    },
    src: {
        assets: {
            allFonts: [
                root.assets + '/fonts/**/*.woff',
                root.assets + '/fonts/**/*.woff2',
                root.assets + '/fonts/**/*.tff',
                root.assets + '/fonts/**/*.ttf',
                root.assets + '/fonts/**/*.eot',
                root.assets + '/fonts/**/*.svg'
            ],
            allVendorsCss: [
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './node_modules/angular-carousel/dist/angular-carousel.min.css'
            ],
            allImages: root.assets + '/images/**/*',
            allSass: root.src + '/styles/**/*.sass',
            styleSass: root.src + '/styles/styles.sass',
            css: root.assets + '/css',
            root: root.assets
        },
        allHtmls: root.src + '/**/*.html',
        allVendors: [
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
            'node_modules/@celular/cd-directives/dist/cd.directives.js'
        ],
        allScripts: [
            'src/app/app.module.js',
            'src/providers/*.js',
            'src/services/*.js',
            'src/filters/*.js',
            'src/**/*.js',
            '!src/**/*.spec.js'
        ]
    },
    test: {
        allTests: root.test + '/spec/**/*.test.js',
        coverage: root.test + '/coverage',
        karmaConf: root.test + '/karma.conf.js'
    },
    tmp: {
        css: root.tmp + '/assets/css/',
        fonts: root.tmp + '/assets/fonts/',
        images: root.tmp + '/assets/images/',
        js: root.tmp + '/assets/js/'
    }
};
