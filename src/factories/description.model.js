(function() {
    'use strict';

    angular
        .module('oi.controle')
        .factory('DescriptionModel', DescriptionModel);

    /* @ngInject */
    function DescriptionModel(StorageService) {

        function create(obj) {
            obj = obj ? angular.isString(obj) ? angular.fromJson(obj) : obj : {};
            return {
                internet:  obj && obj.internet || {},
                minutos: obj && obj.minutos || {},
                sms: obj && obj.sms || {},
                wifi: obj && obj.wifi || {},
                cartao: obj && obj.cartao || {},
                cartao: obj && obj.cartao || {},
                periodo: obj && obj.periodo || {},
                pagamento: obj && obj.pagamento || {},
                save: function() { StorageService.set('Description', this); return this; }
            };
        }

        return create;
    }
})();
