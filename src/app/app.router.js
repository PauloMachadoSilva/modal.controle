'use strict';

angular
    .module('oi.controle')
    .config(AppRouter);

/* @ngInject */
function AppRouter($stateProvider, $urlRouterProvider, $analyticsProvider) {
    $urlRouterProvider.otherwise('/');

    function _fixOverflow() {
        // Conserta overflow-y no IE
        var d = document.body; // eslint-disable-line angular/document-service
        if (d.className.indexOf('modal-open') === -1) {
            d.classList.add('modal-open');
        }
    }

    $stateProvider.state('Main', {
        url: '/',
        transclude: true,
        component: 'wzaHome',
        onEnter: _fixOverflow
    });

    $stateProvider.state('Main.Lead', {
        absolute: true,
        url: 'lead',
        component: 'wzaLead'
    });

    $stateProvider.state('Main.FormaPagamento', {
        absolute: true,
        url: 'forma-pagamento',
        component: 'wzaFormaPagamento'
    });

    $stateProvider.state('Main.Token', {
        absolute: true,
        url: 'confirmacao',
        component: 'wzaToken'
    });

    $stateProvider.state('Main.DadosPessoais', {
        absolute: true,
        url: 'dados-pessoais',
        component: 'wzaDadosPessoais'
    });

    $stateProvider.state('Main.Endereco', {
        absolute: true,
        url: 'endereco',
        component: 'wzaAddress'
    });

    $stateProvider.state('Main.OfertaPos', {
        absolute: true,
        url: 'ofertapos',
        component: 'wzaErro'
    });

    $stateProvider.state('Main.OfertaCartao', {
        absolute: true,
        url: 'ofertacartao',
        component: 'wzaErro'
    });

    $stateProvider.state('Main.Parabens', {
        absolute: true,
        url: 'parabens',
        component: 'wzaParabens'
    });

    $stateProvider.state('Main.DadosCartao', {
        absolute: true,
        url: 'dados-cartao',
        component: 'wzaDadosCartao'
    });

    $stateProvider.state('Main.ParabensSemsaldo', {
        absolute: true,
        url: 'parabens-semsaldo',
        component: 'wzaParabens'
    });

    $stateProvider.state('Main.BuscaCEP', {
        absolute: true,
        url: 'busca-cep',
        component: 'wzaBuscaCEP'
    });

}
