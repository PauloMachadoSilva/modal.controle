(function(){
    'use strict';
    angular
        .module('oi.controle')
        .service('PlanService',PlanService);

    /* @ngInject */
    function PlanService(HttpService, ConfigurationService){
        this.getSelectedPlan = getSelectedPlan;
        var urlReturnPlan = ConfigurationService.urlReturnPlan;

        function getSelectedPlan(sku){
            var planSelected = {};
            var codigoSku = {'CodigoSku' : sku};

            return HttpService.get(urlReturnPlan, codigoSku)
                .then(function(response){
                    return planSelected = response;
                });
        }

    };
})();
