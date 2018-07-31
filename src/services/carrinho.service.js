(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('CarrinhoService', CarrinhoService);

    /* @ngInject */
    function CarrinhoService(HttpService, ConfigurationService, MockService) {
        var urlCarrinho = ConfigurationService.urlCarrinho;

        if (MockService.isEnabled) {
            this.novoCarrinho = novoCarrinhoMock;
        } else {
            this.novoCarrinho = novoCarrinho;
        }

        function novoCarrinho(carrinho) {
            return HttpService.post(urlCarrinho, carrinho);
        };

        function novoCarrinhoMock(carrinho) {
            var step,
                nome = carrinho.DadosPessoais.Nome;

            if (nome === 'Teste Cartao') {
                step = 17;
            } else if (nome === 'Teste Oferta Oi Pos') {
                step = 34;
            } else {
                step = 8;
            }

            return MockService.mockRequest({
                mensagem: 'Sucesso.',
                retorno: {
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    ProximoPasso: step
                }
            });
        };
    };
})();
