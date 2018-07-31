(function() {
    'use strict';
    angular.module('oi.controle')
        .component('wzaFormaPagamento',FormaPagamento());

    function FormaPagamento(){
        var component = {
            controller: FormaPagamentoController,
            templateUrl: '/pages/home/forma-pagamento/forma-pagamento.template.html'
        };

        return component;
    }
    /* @ngInject */
    function FormaPagamentoController(StorageService , RouterFactory , CarrinhoService , $state){
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};
        var _cart = StorageService.get('CART') || {};
        $ctrl.description = StorageService.get('Description');
        $ctrl.bonus = $ctrl.description.internet.Titulo.split('+')[1];

        $ctrl.dto = _dto;
        $ctrl.cart = _cart;
        $ctrl.pagamento;
        $ctrl.isLoading = false;

        $ctrl.selecionaBackground = selecionaBackground;
        $ctrl.$onInit = onInit;
        $ctrl.submit = submit;


        function onInit() {
            selecionaBackground('cartao');
        }

        function selecionaBackground(forma) {
            $ctrl.pagamento = forma;
        }

        function _deleteCartToStorage(){
            StorageService.del('CART');
        }

        function _isCreditCard() {
            $ctrl.dto.paymentMethod = 'creditcard';
            StorageService.set('DTO', $ctrl.dto);
        }
        function _isBills() {
            $ctrl.dto.paymentMethod = 'boleto';
            StorageService.set('DTO', $ctrl.dto);
        }

        
        function _setNewInfoForPlanInCreditCard(){
            if ($ctrl.dto.sku.indexOf('OCCP016') > -1) {
                $ctrl.dto.sku = 'OC00007R2_MIGRACAO';
                $ctrl.cart.CodigoSku = 'OC00007R2_MIGRACAO';
            } else if ($ctrl.dto.sku.indexOf('OCCP017') > -1) {
                $ctrl.dto.sku = 'OC00008R2_MIGRACAO';
                $ctrl.cart.CodigoSku = 'OC00008R2_MIGRACAO';
            }
        }

        function _dataToSend(){
             
            $ctrl.cart.boletoEscolhido = true;
            if($ctrl.pagamento ==='cartao') {
                _isCreditCard();
            }else{
                _setNewInfoForPlanInCreditCard();
                _isBills();

            }
            return $ctrl.cart;
        }

        function _sendLeadTodtoStorage(nextStep, uidCarrinho, viewName) {
            $ctrl.dto.currentStep = nextStep;
            $ctrl.dto.currentStepName = viewName;
            $ctrl.dto.uidCarrinho = uidCarrinho;
            StorageService.set('DTO', $ctrl.dto);
        }


        function submit() {
            var dataToSend;

            dataToSend = _dataToSend();
            $ctrl.isLoading = true;
             
            return CarrinhoService.novoCarrinho(dataToSend)
                .then(function(response) {
                    if (response.retorno) {
                        var viewName = response.retorno.ProximoPassoDescricao,
                            nextStep = response.retorno.ProximoPasso,
                            uidCarrinho = response.retorno.UidCarrinho,
                            nextState;

                        _sendLeadTodtoStorage(nextStep, uidCarrinho, viewName);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        _deleteCartToStorage();
                        $state.go(nextState);
                    }
                })
                .catch(function(error) {
                    var viewName = error.data.retorno.ProximoPassoDescricao,
                        nextStep = error.data.retorno.ProximoPasso,
                        nextState;

                    if (viewName && nextStep) {
                        _sendLeadTodtoStorage(nextStep,'', viewName);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        _deleteCartToStorage();
                        $state.go(nextState);
                    }
                })
                .finally(function() {
                    $ctrl.isLoading = false;
                });


        }

    }
})();
