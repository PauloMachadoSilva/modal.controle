(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaTabBar', {
            controller: TabBarComponentController,
            transclude: true,
            bindings: {
                inactive: '<'
            },
            templateUrl: '/components/tab-bar/tab-bar.template.html'
        });

    function TabBarComponentController() {
        var $ctrl = this;
    }

})();
