(function(){
    'use strict';

    angular.module('oi.controle')
        .component('wzaDadosCartao',DadosCartaoComponent());

    function DadosCartaoComponent(){
        var component ={
            controller: DadosCartaoComponentControler,
            templateUrl: '/pages/home/dados-cartao/dados-cartao.template.html'
        };
        return component;
    }

    /* @ngInject */
    function DadosCartaoComponentControler($analytics, $scope, $state, StorageService, CreditCardService, RouterFactory, MobileService, AnalyticalLogService){
        var $ctrl = this,
            _dto = StorageService.get('DTO');

        $ctrl.formCartao = {
            cpf: _dto.cpf || '',
            anocartao: '',
            mescartao: '',
            codseguranca:'',
            termos: true
        };

        $ctrl.errorMessage = '';
        $ctrl.isLoading = false;
        $ctrl.isMobile = MobileService.isMobile;
        $ctrl.years = [];
        $ctrl.months = [];

        $ctrl.$onInit = activate;
        $ctrl.populateMonth = populateMonth;
        $ctrl.sendFormCartao = sendFormCartao;


        function _fillCardYear(){
            var data = new Date(),
                ano = [];

            for(var currentYear = data.getFullYear();currentYear <= data.getFullYear()+10;currentYear++){
                ano.push(currentYear);
            }
            return ano;
        }

        function _fillCardMonth(){
            var date = new Date(),
                currentYear = date.getFullYear(),
                mes = [],
                labelMes = ['Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril',
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro']
                ;
            if(parseInt($ctrl.formCartao.anocartao) === currentYear){
                for(var currentMonth = date.getMonth() ; currentMonth <= 11;currentMonth++){
                    mes.push({
                        value:currentMonth,
                        label: labelMes[currentMonth]
                    });
                }
            }else{
                for(var x = 1 ; x <= 12;x++){
                    mes.push({
                        value: x,
                        label: labelMes[x-1]
                    });
                }
            }
            return mes;
        }

        function _sendToStorage(nextStep, viewName, orderKey) {
            _dto.currentStep = nextStep;
            _dto.currentStepName = viewName;
            _dto.orderKey = orderKey;
            StorageService.set('DTO', _dto);
        }

        function _populateYears() {
            $ctrl.years = _fillCardYear();
        }

        function populateMonth() {
            $ctrl.months = _fillCardMonth();
        }

        function _parseDataToSend() {
            var parsedData = {
                CPF: $ctrl.formCartao.cpf,
                NumeroCartao: $ctrl.formCartao.numcartao,
                MesExpiracao: $ctrl.formCartao.mescartao,
                AnoExpiracao: $ctrl.formCartao.anocartao,
                Termos: $ctrl.formCartao.termos,
                CodigoSeguranca: $ctrl.formCartao.codseguranca,
                UidCarrinho: _dto.uidCarrinho,
            };
            return parsedData;
        }

        function activate() {
            $analytics.pageTrack('/dados-cartao');
            AnalyticalLogService.sendUid(_dto, 1, null, 'Dados Cartão');
            _populateYears();
            populateMonth(false);
        }

        function sendFormCartao() {
            var creditCardDataToSend = _parseDataToSend();

            if ($scope.formCartao.$invalid) {
                return;
            }

            $ctrl.isLoading = true;
            CreditCardService.sendCreditCardInfo(creditCardDataToSend)
                .then(function(response) {
                    if (response.retorno) {
                        var viewName = response.retorno.ProximoPassoDescricao,
                            nextStep = response.retorno.ProximoPasso,
                            orderKey = response.retorno.CodigoPedido,
                            nextState;
                        _sendToStorage(nextStep, viewName, orderKey);
                        nextState = RouterFactory.getRouteFromId(nextStep);
                        $state.go(nextState);
                    }
                })
                .catch(function(error) {
                    var viewName = error.data.retorno.ProximoPassoDescricao,
                        nextStep = error.data.retorno.ProximoPasso,
                        nextState;

                    if (viewName && nextStep) {
                        _sendToStorage(nextStep, viewName);
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
