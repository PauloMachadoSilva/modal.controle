(function() {
    'use strict';

    angular
        .module('oi.controle')
        .config(AppAnalytics);

    /* @ngInject */
    function AppAnalytics($analyticsProvider) {
        $analyticsProvider.firstPageview(true);
        $analyticsProvider.withAutoBase(true);
        $analyticsProvider.settings.ga = {
            userId: 'GTM-5THSNHS'
        };
    };
}());
