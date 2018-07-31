(function() {
    'use strict';

    angular
        .module('oi.controle')
        .factory('ComplementModel', ComplementModel);

    /* @ngInject */
    function ComplementModel(StorageService) {

        function create(obj) {
            obj = obj ? angular.isString(obj) ? angular.fromJson(obj) : obj : {};
            return {
                dados_valor: obj && obj.dados_valor || '',
                ddd_descricao: obj && obj.ddd_descricao || '',
                ddd_valor: obj && obj.ddd_valor || '',
                minutos_offnet_descricao: obj && obj.minutos_offnet_descricao || '',
                minutos_offnet_valor: obj && obj.minutos_offnet_valor || '',
                minutos_onnet_descricao: obj && obj.minutos_onnet_descricao || '',
                minutos_onnet_valor: obj && obj.minutos_onnet_valor || '',
                sms_descricao: obj && obj.sms_descricao || '',
                sms_valor: obj && obj.sms_valor || '',
                save: function() { StorageService.set('Complement', this); return this; }
            };
        }

        return create;
    }
})();
