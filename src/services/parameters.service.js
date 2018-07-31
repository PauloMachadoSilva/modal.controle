(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('ParametersService', ParametersService);

    /* @ngInject */
    function ParametersService($location,MockService) {
        this.parametros = $location.search();

        this.analytics = {
            'utm_campaign': this.parametros.utm_campaign || this.parametros.trk_campaign,
            'utm_content': this.parametros.utm_content || this.parametros.trk_content,
            'utm_medium': this.parametros.utm_medium || this.parametros.trk_medium,
            'utm_source': this.parametros.utm_source || this.parametros.trk_source,
            'utm_term': this.parametros.utm_term || this.parametros.trk_term,
            'id_grupo': this.parametros.group_id,
            'crmCampanha': this.parametros.crm_campaign
        };

        this.affiliate = {
            'aid': this.parametros.aid,
            'tid': this.parametros.tid
        };

        this.bko = {
            'u': this.parametros.u,
            'codigo_origem': this.parametros.codigo_origem,
            'vendas' : this.parametros.vendas,
            'uid': this.parametros.uid,
            'chat_id': this.parametros.chat_id
        };

        this.configProjeto = {
            'ddd': this.parametros.ddd,
            'uf': this.parametros.uf,
            'plataforma': this.parametros.plataforma,
            'plano': this.parametros.plano,
            'sku': this.parametros.sku ? this.parametros.sku : 'OCCP016R2_MIGRACAO',
            'origem_pedido': this.parametros.origem_pedido
        };

        this.mock = this.parametros.mock;

        //TODO Não estava funcionando pegar do parametro, entao foi usado o document referrer
        function getUid() {
            var uidMatch = document.referrer.match(/uid=\w+/);
            return uidMatch ? uidMatch[0].replace('uid=', '') : '';
        }

        this.uid = getUid();

        if(this.mock){
            MockService.setMockType(this.mock);
        }
    };
})();
