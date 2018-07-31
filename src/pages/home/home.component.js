(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaHome', HomeComponent());

    function HomeComponent() {
        var component = {
            controller: HomeComponentController,
            transclude: true,
            templateUrl: '/pages/home/home.template.html'
        };

        return component;
    }

    /* @ngInject */
    function HomeComponentController($state, $transitions, $window, $timeout, StorageService, RouterFactory, PlanService, ParametersService, MobileService, CrmService, DTOModel, DescriptionModel, ComplementModel) {
        var $ctrl = this;
        var plans = [];
        var analytics = ParametersService.analytics;
        var affiliate = ParametersService.affiliate;
        var bko = ParametersService.bko;
        var configProjeto = ParametersService.configProjeto;

        $ctrl.dto = {};
        $ctrl.showBonus = true;

        $ctrl.$onInit = onInit;
        $ctrl.close = close;
        $ctrl.disableScroll = disableScroll;
        $ctrl.enableScroll = enableScroll;

        if(configProjeto.sku) {
            $ctrl.dto.sku = configProjeto.sku;
            StorageService.set('DTO', $ctrl.dto);
        }

        function _populateSelectedSku() {
            PlanService.getSelectedPlan($ctrl.dto.sku).then(function(response){
                $ctrl.dto.plan = response;
                $ctrl.dto = new DTOModel($ctrl.dto);
                $ctrl.description = new DescriptionModel($ctrl.dto.plan.Sku.Descricao);
                $ctrl.complement = new ComplementModel($ctrl.dto.plan.Sku.Complemento);

                $ctrl.description.save();
                $ctrl.complement.save();
                $ctrl.dto.save();
            });
        }

        function _verifySkuProperty() {
            if (!$ctrl.dto.sku) {
                $state.go('Main');
            } else {
                if ($ctrl.dto.currentStep) {
                    var nextState = RouterFactory.getRouteFromId($ctrl.dto.currentStep);
                    $state.go(nextState);
                } else {
                    $state.go('Main.Lead');
                }
            }
        }


        function _preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return false;
            }
        }

        function _preventDefault(e) {
            e = e || $window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function disableScroll() {
            if ($window.addEventListener)
                $window.addEventListener('DOMMouseScroll', _preventDefault, false);
            $window.ontouchmove = _preventDefault;
        }

        function enableScroll() {
            if ($window.removeEventListener)
                $window.removeEventListener('DOMMouseScroll', _preventDefault, false);
            $window.ontouchmove = null;
        }

        function resolveCrm() {
            return CrmService.getResume();
        }

        function onInit() {
            $ctrl.loading = true;
            resolveCrm()
                .then(function(result) {
                    $ctrl.description = result.description;
                    $ctrl.complement = result.complement;
                    $ctrl.dto = result.dto;
                    nextState = RouterFactory.getRouteFromId(nextStep);
                    $state.go(nextState);
                })
                .catch(function() {
                    _populateSelectedSku();
                    _verifySkuProperty();
                }).finally(function() {
                    $ctrl.loading = false;
                });
        };

        function close() {

            localStorage.clear();
            sessionStorage.clear();

            if(MobileService.isMobile === true){
                $timeout(function(){
                    window.open(window.location, '_self').close();
                    window.location.replace('http://oiplanoscontrole.com.br/');
                },1000);
            }else{
                top.postMessage('fechar!', '*');
            }
        };
    }

})();
