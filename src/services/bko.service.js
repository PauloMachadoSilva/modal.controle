(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('BkoService', BkoService);

    /* @ngInject */
    function BkoService($rootScope, ORIGIN_CODE, USER_SELLER, StorageService, ParametersService) {
        var dto = {};

        if(ParametersService.bko.codigo_origem) {
            $rootScope.originCode = ParametersService.bko.codigo_origem;
            dto.codigoOrigem = $rootScope.originCode;
            StorageService.set('DTO', dto);
        } else {
            $rootScope.originCode = (StorageService.get('DTO') && StorageService.get('DTO').codigoOrigem) ? StorageService.get('DTO').codigoOrigem : ORIGIN_CODE;
        }

        if(ParametersService.bko.u) {
            $rootScope.userSeller = ParametersService.bko.u;
            dto.vendedorUsuario = $rootScope.userSeller;
            StorageService.set('DTO', dto);
        } else {
            $rootScope.userSeller = (StorageService.get('DTO') && StorageService.get('DTO').vendedorUsuario) ? StorageService.get('DTO').vendedorUsuario : USER_SELLER;
        }
    }
})();
