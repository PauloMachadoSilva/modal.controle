(function(){
    'use strict';
    angular.module('oi.controle')
        .service('AddressService', EnderecoService);

    /* @ngInject */
    function EnderecoService(ConfigurationService, HttpService) {
        var urlSendAddress = ConfigurationService.urlSendAddress;
        var urlSearchZipCode = ConfigurationService.urlSearchZipCode;
        
        this.sendAddress = sendAddress;
        this.searchCep = searchCep;
        
        function sendAddress(addressData) {
            return HttpService.put(urlSendAddress,addressData);
        }

        function searchCep(cep) {
            var cep = {'cep': cep};

            return HttpService.get(urlSearchZipCode,cep);
        }

    }

})();
