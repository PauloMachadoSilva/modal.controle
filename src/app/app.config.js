(function() {
    'use strict';

    angular
        .module('oi.controle')
        .config(AppConfig);

    /* @ngInject */
    function AppConfig(configurationProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        configurationProvider.setOperadora(31);
        configurationProvider.setVendedor('mol.oi');
    }

})();
