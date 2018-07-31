(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('TokenService', TokenService);

    /* @ngInject */
    function TokenService(HttpService, ConfigurationService, MockService) {
        var urlConfirmarSms = ConfigurationService.urlConfirmarSms;
        var urlReenviarSms = ConfigurationService.urlReenviarSms;

        if (MockService.isEnabled) {
            this.confirmarSms = confirmarSmsMock;
            this.reenviarSms = reenviarSmsMock;
        } else {
            this.confirmarSms = confirmarSms;
            this.reenviarSms = reenviarSms;
        }

        function confirmarSms(smsInfo) {
            return HttpService.put(urlConfirmarSms, smsInfo);
        };

        function reenviarSms(smsInfo) {
            return HttpService.post(urlReenviarSms, smsInfo);
        };

        function confirmarSmsMock() {
            return MockService.mockRequest({
                mensagem: 'Sucesso.',
                retorno: {
                    ProximoPasso: 2
                }
            });
        };

        function reenviarSmsMock() {
            return MockService.mockRequest({
                retorno: 'OK'
            });
        };
    };
})();
