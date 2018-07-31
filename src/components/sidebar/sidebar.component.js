(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaSidebar', {
            controller: SidebarComponentController,
            templateUrl: '/components/sidebar/sidebar.template.html',
            bindings: {
                bonus:'<',
                dto: '=',
                description: '=',
                complement: '='
            }
        });

    /* @ngInject */
    function SidebarComponentController($state, $transitions, StorageService) {
        var $ctrl = this;

        $ctrl.sidebarType = 'default';
        $ctrl.$onInit = activate;

        function _watchChangeState() {
            $transitions.onStart({}, function(trans) {
                trans.promise.finally(_onStateChange);
            });
        }

        function _onStateChange() {
            _refreshdto();
            _checkSidebarType();
        }

        function _refreshdto() {
            $ctrl.dto = StorageService.get('DTO') || {};
        }

        function _checkSidebarType() {
            if ($state.is('Main.Parabens') || $state.is('Main.ParabensSemsaldo')) {
                $ctrl.sidebarType = 'congratulations';
            } else if ($state.is('Main.OfertaPos')) {
                $ctrl.sidebarType = 'offer-pos';
            } else {
                $ctrl.sidebarType = 'default';
            }
        }

        function activate() {
            _watchChangeState();
            _checkSidebarType();
        }
    }

})();
