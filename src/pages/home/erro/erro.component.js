(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaErro', ErroComponent());

    function ErroComponent() {
        var component = {
            controller: ErroComponentController,
            templateUrl: '/pages/home/erro/erro.template.html'
        };

        return component;
    }

    /* @ngInject */
    function ErroComponentController($analytics, $scope, $state, StorageService, configuration, MobileService, AnalyticalLogService, CarrinhoService, ParametersService, RouterFactory) {
        var $ctrl = this;
        var analytics = ParametersService.analytics;
        var _dto = StorageService.get('DTO') || {};
        var _nome = _dto.nome || '';

        $ctrl.isLoading = false;
        $ctrl.dto = _dto;
        $ctrl.nome = _nome.split(' ');
        $ctrl.erroType;
        $ctrl.isMobile = MobileService.isMobile;

        $ctrl.$onInit = activate;
        $ctrl.goToCreditCardFlux = goToCreditCardFlux;
        $ctrl.goToCreditCardView = goToCreditCardView;
        $ctrl.trackOiPosOffer = trackOiPosOffer;
        $ctrl.sendLead = sendLead;

        function _setErroType() {
            switch ($ctrl.dto.currentStep) {
                case 34: // Erro Ofertar Pos
                case 36: // Fazer Recarga
                case 38: // Atendimento da Operadora
                    $ctrl.erroType = 'oferta-pos';
                    $analytics.pageTrack('/ofertapos');
                    AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
                    break;
                case 35: // Erro Ofertar Fluxo Cartao
                    _setPaymentMethodCreditCardConfig();
                    $analytics.pageTrack('/ofertacartao');
                    AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
                    $ctrl.erroType = 'oferta-cartao';
                    break;
                case 40: // Erro Retentativa Cartao
                    $ctrl.erroType = 'retentativa-cartao';
                    $analytics.pageTrack('/retentativa-cartao');
                    AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
                    break;
            }
        }

        function _setPaymentMethodCreditCardConfig() {
            $ctrl.dto.paymentMethod = 'creditcard';
            StorageService.set('DTO', $ctrl.dto);
        }

        function _sendLeadTodtoStorage(nextStep, uidCarrinho, viewName) {
            _dto.currentStep = nextStep;
            _dto.currentStepName = viewName;
            _dto.uidCarrinho = uidCarrinho;
            StorageService.set('DTO', _dto);
        }

        function activate() {
            _setErroType();
        }

        function goToCreditCardFlux() {
            AnalyticalLogService.sendUid($ctrl.dto, 12, 'Aceita Oferta de Cartão', $ctrl.dto.currentStepName);
            $state.go('Main.Token');
        }

        function goToCreditCardView() {
            AnalyticalLogService.sendUid($ctrl.dto, 12, 'Aceita nova retentativa', $ctrl.dto.currentStepName);
            $state.go('Main.DadosCartao');
        }

        function trackOiPosOffer() {
            AnalyticalLogService.sendUid($ctrl.dto, 12, 'Aceita oferta oi pós', $ctrl.dto.currentStepName);
        }


        function _parseDataToSend() {
            var parsedData = {
                CodigoSku: $ctrl.dto.sku,
                DadosPessoais: {
                    Nome: $ctrl.dto.nome,
                    Email: $ctrl.dto.email
                },
                LinhaServico: $ctrl.dto.telefone.substr(2, $ctrl.dto.telefone.length),
                DddServico: $ctrl.dto.telefone.substr(0, 2),
                UtmCampanha: analytics.utm_campaign || analytics.trk_campaign,
                UtmConteudo: analytics.utm_content || analytics.trk_content,
                UtmMidia: analytics.utm_medium || analytics.trk_medium,
                UtmOrigem: analytics.utm_source || analytics.trk_source,
                UtmParceiro: analytics.utm_partner || analytics.trk_partner,
                UtmTermo: analytics.utm_term || analytics.trk_term,
                View: 'Ofertar Cartao'
            };

            return parsedData;
        }

        function sendLead() {
            var dataToSend;

            dataToSend = _parseDataToSend();
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
                        $state.go(nextState);
                    }
                })
                .finally(function() {
                    $ctrl.isLoading = false;
                });

        }
    }

})();
