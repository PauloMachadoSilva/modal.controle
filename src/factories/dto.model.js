(function() {
    'use strict';

    angular
        .module('oi.controle')
        .factory('DTOModel', DTOModel);

    /* @ngInject */
    function DTOModel(StorageService) {

        function getPhone(obj) {
            return obj && obj.DddContato && obj.LinhaContato ? obj.DddContato + obj.LinhaContato : '';
        }

        function create(obj) {
            obj = obj || {DadosPessoais: {}};
            return {
                sku: obj && obj.CodigoSku || '',
                uidSession: obj && obj.UidSession || '',
                currentStep: obj && obj.ProximoPasso || '',
                currentStepName: obj && obj.ProximoPassoDescricao || '',
                uidCarrinho: obj && obj.Uid || '',
                nome: obj && obj.DadosPessoais && obj.DadosPessoais.Nome || '',
                nomeMae: obj && obj.DadosPessoais && obj.DadosPessoais.NomeMae || '',
                nascimento: obj && obj.DadosPessoais && obj.DadosPessoais.Nascimento || '',
                cpf: obj && obj.DadosPessoais && obj.DadosPessoais.Cpf || '',
                telefone: getPhone(obj.DadosPessoais),
                DddContato: obj.DadosPessoais && obj.DddContato || '',
                LinhaContato: obj.DadosPessoais && obj.LinhaContato || '',
                plan: obj.plan,
                email: obj && obj.DadosPessoais && obj.DadosPessoais.Email || '',
                save: function() { StorageService.set('DTO', this); return this; }
            };
        }

        return create;
    }
})();
