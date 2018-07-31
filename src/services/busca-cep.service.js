(function(){
    'use strict';

    angular
        .module('oi.controle')
        .service('BuscaCepService', BuscaCepService);

    /* @ngInject */
    function BuscaCepService(HttpService, ConfigurationService){
        var urlReturnAddress = ConfigurationService.urlSearchAddress;
        this.listAddress = listAddress;

        function listAddress(address) {
            return HttpService.get(urlReturnAddress, {Endereco: address})
                .then(function(response){
                    return response;
                });
        }
    };
})();
