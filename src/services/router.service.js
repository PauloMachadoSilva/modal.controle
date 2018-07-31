(function() {
    'use strict';

    angular.module('oi.controle')
        .factory('RouterFactory', RouterFactory);

    function RouterFactory() {
        function getRouteFromId(id) {
            var route = '';
            switch (id) {
                case 2: // Dados Pessoais
                case 37: // Pre cadastro cartao
                    route = 'Main.DadosPessoais';
                    break;
                case 3: // Endereço
                    route = 'Main.Endereco';
                    break;
                case 8: // Confirmar SMS
                    route = 'Main.Token';
                    break;
                case 9: // Parabéns
                    route = 'Main.Parabens';
                    break;
                case 41: // Parabéns Sem Saldo
                    route = 'Main.ParabensSemsaldo';
                    break;
                case 17: // Venda Cartão
                    route = 'Main.DadosCartao';
                    break;
                case 40: // Erro Retentativa Cartao
                    route = 'Main.Erro';
                    break;
                case 38: // Erro Atendimento da Operadora
                    route = 'Main.Erro';
                case 34: // Erro Ofertar Pos
                    route = 'Main.OfertaPos';
                case 36: // Fazer Recarga
                    route = 'Main.OfertaPos';
                    break;
                case 35: // Erro Ofertar Fluxo Cartao
                    route = 'Main.OfertaCartao';
                    break;
                case 55: // Erro Ofertar Fluxo Cartao
                    route = 'Main.FormaPagamento';
                    break;
            }

            return route;
        }

        return {
            getRouteFromId: getRouteFromId
        };
    }

})();
