(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('ConfigurationService', ConfigurationService);

    /* @ngInject */
    function ConfigurationService($http, configuration) {
        // Token
        $http.defaults.headers.common.Authorization = configuration.token;
        // Codigo da operadora
        $http.defaults.headers.common.CodigoOperadora = configuration.codigoOperadora;
        $http.defaults.headers.common.Language = 'pt-BR';

        this.urlCarrinho = configuration.apiUrl + '/carrinho';
        this.urlConfirmarSms = configuration.apiUrl + '/confirmarsms';
        this.urlReenviarSms = configuration.apiUrl + '/reenviar/sms';
        this.urlEnviaDadosPessoais = configuration.apiUrl + '/dadospessoais';
        this.urlEnviaDadosCartao = configuration.apiUrl + '/cartao';
        this.urlPlan = configuration.apiUrl + '/cartao';
        this.urlReturnPlan =  configuration.apiDefault + '/produto/sku/obter/PorCodigoSku';
        this.urlSendAddress = configuration.apiUrl + '/endereco';
        this.urlSearchZipCode = configuration.apiDefault + '/endereco/obter/porcep';
        this.urlSearchAddress =  configuration.apiDefault + '/endereco/listar/porendereco';
        this.urlCrm = configuration.apiDefault + '/carrinho/obter/pedido/retomada';
    };
})();
