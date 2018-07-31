(function() {
    'use strict';
    var dataLayer = window.dataLayer = window.dataLayer || [];

    angular
        .module('oi.controle')
        .run(AppRun);

    /* @ngInject */
    function AppRun($transitions, $location) {
        activate();

        function activate() {
            registerRouteChangeForAnalytics();
        }

        function registerRouteChangeForAnalytics() {
            $transitions.onSuccess({}, function() {
                dataLayer.push({
                    event: 'ngRouteChange',
                    attributes: {
                        route: $location.path()
                    }
                });
            });
        }
    }

})();
