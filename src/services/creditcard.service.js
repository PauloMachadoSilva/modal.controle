(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('CreditCardService', CreditCardService);

    /* @ngInject */
    function CreditCardService(HttpService, ConfigurationService, MockService) {
        var urlEnviaDadosCartao = ConfigurationService.urlEnviaDadosCartao;

        if (MockService.isEnabled) {
            this.sendCreditCardInfo = sendCreditCardInfoMock;
        } else {
            this.sendCreditCardInfo = sendCreditCardInfo;
        }

        function sendCreditCardInfo(creditCardData) {
            return HttpService.post(urlEnviaDadosCartao, creditCardData);
        };

        function sendCreditCardInfoMock(creditCardData) {
            var step,
                cvv = creditCardData.FormCartao.CodSeguranca;

            if (cvv === '9997') {
                step = 40;
            } else {
                step = 9;
            }

            return MockService.mockRequest({
                mensagem: 'Sucesso.',
                retorno: {
                    ProximoPasso: step
                }
            });
        };
    };
})();
