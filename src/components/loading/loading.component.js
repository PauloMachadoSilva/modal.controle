(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaLoading', {
            controller: LoadingComponentController,
            bindings: {
                telefone: '<',
            },
            templateUrl: '/components/loading/loading.template.html'
        });

    /* @ngInject */
    function LoadingComponentController($interval, $state, StorageService) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};


        $ctrl.$onInit = activate;
        $ctrl.isDadosPessoais = false;

        function _stateIsDadosPessoais() {
            if ($state.is('Main.DadosPessoais')){
                $ctrl.isDadosPessoais = true;
            }
        }

        function activate() {
            $ctrl.telefone = _dto.telefone;
            _stateIsDadosPessoais();
        }
    }

})();
