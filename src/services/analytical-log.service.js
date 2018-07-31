(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('AnalyticalLogService', AnalyticalLogService);

    /* @ngInject */
    function AnalyticalLogService(HttpService, ParametersService, configuration, StorageService) {
        var API_URL = configuration.baseUrl;
        var COMPANY_CODE = configuration.codigoOperadora;
        var url = API_URL + '/v1/api/carrinho/log/analitico';
        this.sendUid = sendUid;

        // private methods
        function _generateGuid() {
            var dateNow = new Date(),
                day = (dateNow.getDate() < 10) ? '0' + dateNow.getDate() : dateNow.getDate(),
                month = ((dateNow.getMonth() + 1) < 10) ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1,
                year = dateNow.getFullYear();

            return year + month + day + '-' +
                _generateRandomNumber() + '-' +
                _generateRandomNumber() + '-' +
                _generateRandomNumber() + '-' +
                _generateRandomNumber() +
                _generateRandomNumber() +
                _generateRandomNumber();
        }

        function _generateRandomNumber() {
            return Math
                .floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        // public methods
        function sendUid(dto, eventLog, eventRequest, view) {
            var uidSession = (dto.uidSession) ? dto.uidSession : _generateGuid(),
                contract = {
                    'CodigoOperadora': COMPANY_CODE,
                    'EventoLogAnalitico': eventLog,
                    'EventoRequest': eventRequest,
                    'UidSession': uidSession,
                    'UtmCampanha': ParametersService.analytics.utm_campaign || ParametersService.analytics.trk_campaign,
                    'UtmConteudo': ParametersService.analytics.utm_content || ParametersService.analytics.trk_content,
                    'UtmMidia': ParametersService.analytics.utm_medium || ParametersService.analytics.trk_medium,
                    'UtmOrigem': ParametersService.analytics.utm_source || ParametersService.analytics.trk_source,
                    'UtmParceiro': ParametersService.analytics.utm_parceiro || ParametersService.analytics.trk_parceiro,
                    'UtmTermo': ParametersService.analytics.utm_term || ParametersService.analytics.trk_term ,
                    'View': view
                };

            if (!dto.uidSession) {
                dto.uidSession = uidSession;
                StorageService.set('DTO', dto);
            }

            return HttpService.post(url, contract, true);
        }
    }
})();
