(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaTab', {
            controller: TabComponentController,
            bindings: {
                name: '@',
                active: '<',
                state: '@',
                completed: '<'
            },
            templateUrl: '/components/tab-bar/tab/tab.template.html'
        });

    /* @ngInject */
    function TabComponentController($state) {
        this.goTo = goTo;

        function goTo(state) {
            if (state) {
                $state.go('Main.' + state);
            }
        }
    }


})();
