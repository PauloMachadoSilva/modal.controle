(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaDadosPessoais', DadosPessoaisComponent());

    function DadosPessoaisComponent() {
        var component = {
            controller: DadosPessoaisComponentController,
            templateUrl: '/pages/home/dados-pessoais/dados-pessoais.template.html'
        };

        return component;
    }

    /* @ngInject */
    function DadosPessoaisComponentController($analytics, $scope, $state, StorageService, DadosPessoaisService, RouterFactory, MobileService, AnalyticalLogService) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};

        $ctrl.dadosPessoais = {
            nome: _dto.nome || '',
            email: _dto.email || '',
            numero: _dto.telefone || '',
            cpf: _dto.cpf || '',
            nascimento: _dto.nascimento || '',
            nomeMae: _dto.nomeMae || ''
        };

        $ctrl.errorMessages = {};

        $ctrl.isLoading = false;
        $ctrl.isMobile = MobileService.isMobile;
        $ctrl.isCreditcard = _dto.paymentMethod === 'creditcard' ? true : false;

        $ctrl.$onInit = activate;
        $ctrl.sendDadosPessoais = sendDadosPessoais;

        function _sendDadosPessoaisToDtoStorage(nextStep, viewName) {
            _dto.nome = $ctrl.dadosPessoais.nome;
            _dto.email = $ctrl.dadosPessoais.email;
            _dto.cpf = $ctrl.dadosPessoais.cpf;
            _dto.nascimento = $ctrl.dadosPessoais.nascimento;
            _dto.nomeMae = $ctrl.dadosPessoais.nomeMae;
            _dto.currentStep = nextStep;
            _dto.currentStepName = viewName;
            StorageService.set('DTO', _dto);
        }

        function _parseDataToSend() {
            var parsedData = {
                DadosPessoais: {
                    Nome: $ctrl.dadosPessoais.nome,
                    Email: $ctrl.dadosPessoais.email,
                    NomeMae: $ctrl.dadosPessoais.nomeMae,
                    Nascimento: $ctrl.dadosPessoais.nascimento,
                    Cpf: $ctrl.dadosPessoais.cpf,
                    DddContato : $ctrl.dadosPessoais.numero.substr(0, 2),
                    LinhaContato : $ctrl.dadosPessoais.numero.substr(2, $ctrl.dadosPessoais.numero.length),
                },
                UidCarrinho: _dto.uidCarrinho,
            };

            return parsedData;
        }

        function _trackLogByPaymentMethod() {
            if ($ctrl.isCreditcard) {
                $analytics.pageTrack('/dados-pessoais-cartao');
                AnalyticalLogService.sendUid(_dto, 1, null, 'Dados Pessoais Cartão');
            } else {
                $analytics.pageTrack('/dados-pessoais');
                AnalyticalLogService.sendUid(_dto, 1, null, 'Dados Pessoais');
            }
        }

        function activate() {
            _trackLogByPaymentMethod();
        }

        function sendDadosPessoais() {
            var dataToSend = _parseDataToSend(),
                nextStep;

            $ctrl.isLoading = true;
            return DadosPessoaisService.enviarDadosPessoais(dataToSend)
                .then(function(response) {
                    if (response.retorno) {
                        var viewName = response.retorno.ProximoPassoDescricao,
                            nextStep = response.retorno.ProximoPasso,
                            nextState;

                        _sendDadosPessoaisToDtoStorage(nextStep, viewName);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        $state.go(nextState);
                    }
                })
                .catch(function(error) {
                    var viewName = error.data.retorno.ProximoPassoDescricao,
                        nextStep = error.data.retorno.ProximoPasso,
                        validacoes = error.data.validacoes,
                        nextState;

                    if (validacoes && validacoes.length > 0) {
                        _populateErrorMessages(validacoes);
                    } else if (viewName && nextStep) {
                        _sendDadosPessoaisToDtoStorage(nextStep, viewName);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        $state.go(nextState);
                    }
                })
                .finally(function() {
                    $ctrl.isLoading = false;
                });

        }

        function _populateErrorMessages(validations){
            var index;
            $ctrl.errorMessages = {};
            for (index = 0; index < validations.length; index++) {
                var field = validations[index].Mensagem;
                $ctrl.errorMessages[field] = true;
            }
        }

    }

})();
