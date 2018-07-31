(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaToken', TokenComponent());

    function TokenComponent() {
        var component = {
            controller: TokenComponentController,
            templateUrl: '/pages/home/token/token.template.html'
        };

        return component;
    }

    /* @ngInject */
    function TokenComponentController($analytics, $scope, $state, StorageService, TokenService, RouterFactory, MobileService, AnalyticalLogService) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};

        $ctrl.dto = _dto;
        $ctrl.errorValidation = '';
        $ctrl.errorMessages = {};
        $ctrl.isLoading = false;
        $ctrl.isMobile = MobileService.isMobile;
        $ctrl.telefone = _dto.telefone;
        $ctrl.token;
        $ctrl.isCreditcard = _dto.paymentMethod === 'creditcard' ? true : false;
        $ctrl.requestToken = requestToken;
        $ctrl.sendToken = sendToken;
        $ctrl.$onInit = activate;


        function _sendToStorage(nextStep, viewName) {
            _dto.currentStep = nextStep;
            _dto.currentStepName = viewName;
            StorageService.set('DTO', _dto);
        }

        function _trackLogByPaymentMethod() {
            if ($ctrl.isCreditcard) {
                $analytics.pageTrack('/confirmacao-cartao');
                AnalyticalLogService.sendUid($ctrl.dto, 1, null, 'Confirmar SMS Cartão');
            } else {
                $analytics.pageTrack('/confirmacao');
                AnalyticalLogService.sendUid($ctrl.dto, 1, null, 'Confirmar SMS');
            }
        }

        function activate() {
            AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
        }

        function sendToken() {
            var dataToSend = {
                    UidCarrinho: _dto.uidCarrinho,
                    Token: $ctrl.token
                },
                nextStep;


            $ctrl.isLoading = true;
            return TokenService.confirmarSms(dataToSend)
                .then(function(response) {
                    if (response.retorno) {
                        var viewName = response.retorno.ProximoPassoDescricao,
                            nextStep = response.retorno.ProximoPasso,
                            nextState;

                        _sendToStorage(nextStep, viewName);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        $state.go(nextState);
                    }
                })
                .catch(function(error) {
                    var mensagem = error.data.mensagem;

                    if (mensagem) {
                        _populateErrorMessages(mensagem);
                    }
                })
                .finally(function() {
                    $ctrl.isLoading = false;
                });

        }

        function requestToken() {
            var dataToSend = {
                UidCarrinho: _dto.uidCarrinho
            };
            $ctrl.isLoading = true;
            TokenService.reenviarSms(dataToSend)
                .catch(function(error) {
                    var mensagem = error.data.mensagem;
                    if (mensagem) {
                        _populateErrorMessages(mensagem);
                    }
                })
                .finally(function() {
                    $ctrl.isLoading = false;
                });
        }

        function _populateErrorMessages(message){
            var index;
            $ctrl.errorMessages = {};

            if (message.indexOf('Token inválido.') >= 0){
                $ctrl.errorMessages.token = true;
                $ctrl.errorValidation = 'Token inválido.';
            } else if (message.indexOf('Campos') >= 0){
                $ctrl.errorMessages.token = true;
                $ctrl.errorValidation = 'Campo Obrigatório';
            } else if (message.indexOf('Aguarde 30 segundos para reenviar o código de acesso.') >= 0){
                $ctrl.errorMessages.resendToken = true;
                $ctrl.errorValidation = 'Aguarde 30 segundos para reenviar o código de acesso.';
            }
        }
    }

})();
