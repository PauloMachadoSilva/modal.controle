(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaAddress', AddressComponent());

    function AddressComponent() {
        var component = {
            controller: AddressComponentController,
            controllerAs: '$ctrl',
            templateUrl: '/pages/home/endereco/endereco.template.html'
        };

        return component;
    }

    /* @ngInject */
    function AddressComponentController(StorageService,$analytics,MobileService,AddressService,RouterFactory,$state) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO');

        $ctrl.endereco = {
            cep: _dto.cep || '',
            endereco: _dto.endereco || '',
            logradouro: _dto.logradouro || '',
            enderecoCompleto: _dto.logradouro &&  _dto.endereco ? _dto.logradouro +' '+ _dto.endereco  : '',
            numero: _dto.numero || '',
            complemento: _dto.complemento || '',
        };
        $ctrl.errorMessages = {};
        $ctrl.isLoading = false;
        $ctrl.isMobile = MobileService.isMobile;
        $ctrl.isCreditcard = _dto.paymentMethod === 'creditcard' ? true : false;


        $ctrl.$onInit = activate;
        $ctrl.sendAddress = sendAddress;
        $ctrl.searchAddress = searchAddress;
        $ctrl.findCep = findCep;

        function activate() {
            $analytics.pageTrack('/endereco');
        }

        function findCep(){
            $state.go('Main.BuscaCEP');
        }

        function searchAddress(cep) {
            if(cep.length === 8){
                $ctrl.isLoading = true;
                return AddressService.searchCep(cep)
                    .then(function(response){
                        $ctrl.isLoading = false;
                        $ctrl.endereco.logradouro = response.EnderecoCompleto.Logradouro || '';
                        $ctrl.endereco.endereco = response.EnderecoCompleto.Endereco || '';
                        $ctrl.endereco.enderecoCompleto = response.EnderecoCompleto.Logradouro +' '+ response.EnderecoCompleto.Endereco || '';
                    })
                    .catch(function(error){
                        $ctrl.errorMessages.nome = true;
                        console.error(error);
                    });
            }

        }

        function _sendAddressToDtoStorage(nextStep, viewName) {
            _dto.cep = $ctrl.endereco.cep;
            _dto.endereco = $ctrl.endereco.endereco;
            _dto.logradouro = $ctrl.endereco.logradouro;
            _dto.numero = $ctrl.endereco.numero;
            _dto.complemento = $ctrl.endereco.complemento;
            _dto.currentStep = nextStep;
            _dto.currentStepName = viewName;
            StorageService.set('DTO', _dto);
        }

        function _parseDataToSend() {
            var parsedData = {
                endereco: {
                    Cep: $ctrl.endereco.cep,
                    Endereco: $ctrl.endereco.endereco,
                    Numero: $ctrl.endereco.numero,
                    Complemento: $ctrl.endereco.complemento
                },
                DiaVencimento : '11',
                View: 'endereco',
                TermoAcordo : 'True',
                UidCarrinho: _dto.uidCarrinho || 'b347081c51ac4825b74b6a63297218af',
                UidSession : _dto.uidSession,
            };
            return parsedData;
        }

        function sendAddress() {
            var data = _parseDataToSend();
            $ctrl.isLoading = true;

            return AddressService.sendAddress(data)
                .then(function(response){
                    var viewName = response.retorno.ProximoPassoDescricao,
                        nextStep = response.retorno.ProximoPasso,
                        nextState;
                    _sendAddressToDtoStorage(nextStep, viewName);
                    nextState = RouterFactory.getRouteFromId(nextStep);
                    $state.go(nextState);

                })
                .catch(function(error){
                    //console.error(error);
                });
        }
    }

})();
