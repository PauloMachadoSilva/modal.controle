(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaBuscaCEP', BuscaCEPComponent());

    function BuscaCEPComponent() {
        var component = {
            controller: BuscaCEPController,
            templateUrl: '/pages/home/busca-cep/busca-cep.template.html'
        };

        return component;
    }

    /* @ngInject */
    function BuscaCEPController($analytics, $state, StorageService, BuscaCepService, $timeout) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};
        var _oiuid = StorageService.get('oiuid');

        $ctrl.dto = _dto;
        $ctrl._debounceTimeout = null;
        $ctrl.description = StorageService.get('Description');
        $ctrl.handleInputAddress = handleInputAddress;
        $ctrl.selectedAddress = selectedAddress;
        $ctrl.isLoading = false;


        function handleInputAddress(address) {
            if(angular.isUndefined(address) || address.length < 6){
                return;
            }

            if ($ctrl._debounceTimeout) {
                $timeout.cancel($ctrl._debounceTimeout);
                $ctrl._debounceTimeout = null;
            }
    
            $ctrl._debounceTimeout = $timeout(function() {
                $ctrl.isLoading = true;
                $ctrl._debounceTimeout = null;
                if (!address) {
                    return;
                }
                _searchAddress(address);
            }, 1500);
        }

        function _searchAddress(address){
            BuscaCepService.listAddress(address)
                .then(function(data) {
                    if (data.hasOwnProperty('EnderecosCompleto')) {
                        $ctrl.isLoading = false;
                        $ctrl.listAddress = data.EnderecosCompleto;
                    }
                });
        }
        function selectedAddress(address) {
            _dto.cep = address.Cep || '';
            _dto.endereco = address.Endereco || '';
            _dto.logradouro = address.Logradouro || '';

            StorageService.set('DTO',_dto);
            $state.go('Main.Endereco');
        }

    }

})();
