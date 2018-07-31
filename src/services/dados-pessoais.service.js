(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('DadosPessoaisService', DadosPessoaisService);

    /* @ngInject */
    function DadosPessoaisService($timeout, $q, HttpService, ConfigurationService, MockService) {
        var urlEnviaDadosPessoais = ConfigurationService.urlEnviaDadosPessoais;

        if (MockService.noApiInfo) {
            this.enviarDadosPessoais = enviarDadosPessoaisMock;
        } else {
            this.enviarDadosPessoais = enviarDadosPessoais;
        }


        function enviarDadosPessoais(dadosPessoais) {
            return HttpService.put(urlEnviaDadosPessoais, dadosPessoais);
        };

        function enviarDadosPessoaisMock(dadosPessoais) {
            var step,
                nomeMae = dadosPessoais.DadosPessoais.NomeMae;

            if (nomeMae === 'Teste Oferta Oi Pos') {
                step = 34;
            } else if (nomeMae === 'Teste Parabens Sem Saldo') {
                step = 41;
            } else if (nomeMae === 'Teste Cartao') {
                step = 17;
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
