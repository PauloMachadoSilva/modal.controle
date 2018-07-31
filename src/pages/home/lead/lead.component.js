(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaLead', LeadComponent());

    function LeadComponent() {
        var component = {
            controller: LeadComponentController,
            templateUrl: '/pages/home/lead/lead.template.html'
        };

        return component;
    }

    /* @ngInject */
    function LeadComponentController($analytics, $scope, $state, StorageService, ParametersService, CarrinhoService, RouterFactory, AnalyticalLogService) {
        var $ctrl = this;
        var analytics = ParametersService.analytics;
        var bko = ParametersService.bko;
        var affiliate = ParametersService.affiliate;
        var _dto = StorageService.get('DTO') || {};

        $ctrl.dto = _dto;
        $ctrl.isLoading = false;
        $ctrl.lead = {};
        $ctrl.sendLead = sendLead;

        $ctrl.$onInit = activate;

        function _sendLeadTodtoStorage(nextStep, uidCarrinho, viewName) {
            $ctrl.dto.telefone = $ctrl.lead.telefone;
            $ctrl.dto.nome = $ctrl.lead.nome;
            $ctrl.dto.email = $ctrl.lead.email;
            $ctrl.dto.currentStep = nextStep;
            $ctrl.dto.currentStepName = viewName;
            $ctrl.dto.uidCarrinho = uidCarrinho;
            StorageService.set('DTO', $ctrl.dto);
        }

        function _sendCartToStorage(cart){
            $ctrl.dto.cart = cart;
            $ctrl.dto.cart.CodigoOrigem = '';
            StorageService.set('CART', $ctrl.dto.cart);

        }

        function _parseDataToSend() {
            var parsedData = {
                CodigoSku: $ctrl.dto.sku,
                DadosPessoais: {
                    Nome: $ctrl.lead.nome,
                    Email: $ctrl.lead.email
                },
                LinhaServico: $ctrl.lead.telefone.substr(2, $ctrl.lead.telefone.length),
                DddServico: $ctrl.lead.telefone.substr(0, 2),
                idAfiliado : ($ctrl.dto.affiliate && $ctrl.dto.affiliate.aid) ? $ctrl.dto.affiliate.aid : undefined,
                TID : (affiliate &&  affiliate.tid) ? affiliate.tid : undefined,
                Utm: {
                    UtmCampanha: analytics.utm_campaign || analytics.trk_campaign,
                    UtmConteudo: analytics.utm_content || analytics.trk_content,
                    UtmMidia: analytics.utm_medium || analytics.trk_medium,
                    UtmOrigem: analytics.utm_source || analytics.trk_source,
                    UtmParceiro: analytics.utm_partner || analytics.trk_partner,
                    UtmTermo: analytics.utm_term || analytics.trk_term
                },
                View: 'Lead',
                VendedorUsuario: bko.u,
                ChatId: bko.chat_id,
                idGrupo: analytics.id_grupo,
                crmCampanha: analytics.crmCampanha

            };

            _isPlanAdvanced(parsedData);

            return parsedData;
        }

        function _isPlanAdvanced(card) {
            if(card.CodigoSku.indexOf('OCCP018') > -1){
                card.boletoEscolhido = true;
            }
        }

        function _isOnlyCreditCardPlan() {
            if ($ctrl.dto.sku == 'OCCP011R1_MIGRACAO') {
                $ctrl.dto.paymentMethod = 'creditcard';
                StorageService.set('DTO', $ctrl.dto);
            }
        }

        function activate() {
            $analytics.pageTrack('/lead');
            AnalyticalLogService.sendUid($ctrl.dto, 1, null, 'Lead');
            _isOnlyCreditCardPlan();
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
                        _sendCartToStorage(dataToSend);
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
