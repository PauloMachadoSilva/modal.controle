(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('CrmService', CrmService);

    /* @ngInject */
    function CrmService(HttpService, ConfigurationService, ComplementModel, DTOModel, DescriptionModel, ParametersService, $q) {
        this.getResume = getResume;

        function getResume() {
            if(!ParametersService.uid){
                return $q.reject('Não possui retomada');
            }

            return HttpService.get(ConfigurationService.urlCrm, {uid: ParametersService.uid})
                .then(function(res) {
                    var complement  = new ComplementModel(res.retorno.Complemento),
                        dto = new DTOModel(res.retorno),
                        description = new DescriptionModel(res.retorno.Descricao);

                    complement.save();
                    dto.save();
                    description.save();

                    return {complement: complement, dto: dto, description: description};
                });
        }
    }
})();
