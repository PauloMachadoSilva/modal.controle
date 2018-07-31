(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('HttpService', HttpService);

    /* @ngInject */
    function HttpService($http, $rootScope, configuration, StorageService,ParametersService) {
        this.get = get;
        this.post = post;
        this.put = put;

        var vendedorUsuario = configuration.vendedorUsuario;
        var codigoOrigem = configuration.codigoOrigem.billet;
        var view;
        var uidSession;

        // metodos privados
        function _erro(erro) {
            console.error('Erro: ', erro);
            throw erro;
        };

        function _sucesso(data, status, headers, config) {
            return data.data;
        };

        function _checkOriginCode() {
            var _dto = StorageService.get('DTO') || {};
            var _cart = StorageService.get('DTO') || {};
             
            var paymentMethod = _dto.paymentMethod ? _dto.paymentMethod : 'billet';
            if(paymentMethod ==='billet') {
                if(ParametersService.configProjeto.origem_pedido ==='vendas-chat'){
                    return configuration.codigoOrigem.billet.chat;
                }else if(ParametersService.configProjeto.origem_pedido === 'vendas-voz'){
                    return configuration.codigoOrigem.billet.voice;
                }else{
                    return configuration.codigoOrigem.billet.default;
                }
            }
            
            if(paymentMethod == 'boleto'){
                return configuration.codigoOrigem.boleto;
            }

            return configuration.codigoOrigem[paymentMethod];
        };

        function _checkActualView() {
            var _dto = StorageService.get('DTO') || {};
            return _dto.currentStepName;
        };

        function _checkUidSession() {
            var _dto = StorageService.get('DTO') || {};
            return _dto.uidSession;
        };

        function _refreshParams() {
            codigoOrigem = _checkOriginCode();
            view = _checkActualView();
            uidSession = _checkUidSession();
        };

        // metodos publicos
        function get(url, parametros) {
            _refreshParams();
            var urlFormatada = url + '?CodigoOrigem=' + codigoOrigem + '&VendedorUsuario=' + vendedorUsuario;

            return $http.get(urlFormatada, { params: parametros })
                .then(_sucesso)
                .catch(_erro);
        };

        function post(url, parametros) {
            _refreshParams();

            parametros.CodigoOrigem = parametros.CodigoOrigem ? parametros.CodigoOrigem : codigoOrigem;
            parametros.UidSession = parametros.UidSession ? parametros.UidSession : uidSession;
            parametros.VendedorUsuario = parametros.VendedorUsuario ? parametros.VendedorUsuario : vendedorUsuario;
            parametros.View = parametros.View ? parametros.View : view;

            return $http.post(url, parametros)
                .then(_sucesso)
                .catch(_erro);
        };

        function put(url, parametros) {
            _refreshParams();
            parametros.CodigoOrigem = codigoOrigem;
            parametros.VendedorUsuario = vendedorUsuario;
            parametros.UidSession = uidSession;
            parametros.View = parametros.View ? parametros.View : view;

            return $http.put(url, parametros)
                .then(_sucesso)
                .catch(_erro);
        };
    };
})();
