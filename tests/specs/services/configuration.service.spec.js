(() => {
    'use strict';

    describe('Service: ConfigurationService', () => {
        application.initModule();

        var ConfigurationService,
            apiUrl;

        beforeEach(inject(($injector) => {
            ConfigurationService = $injector.get('ConfigurationService');
            apiUrl = $injector.get('configuration').apiUrl;
        }));

        it('service should be defined', () => {
            expect(ConfigurationService).toBeDefined();
        });

        it('plans url should be equal to api url', () => {
            expect(ConfigurationService.urlPlan).toEqual(apiUrl + '/cartao');
        });

        it('urlNovoCarrinho should be equal to /novo', () => {
            expect(ConfigurationService.urlCarrinho).toEqual(apiUrl + '/carrinho');
        });

        it('urlConfirmarSms should be equal to /confirmarsms', () => {
            expect(ConfigurationService.urlConfirmarSms).toEqual(apiUrl + '/confirmarsms');
        });

        it('urlReenviarSms should be equal to /reenviar/sms', () => {
            expect(ConfigurationService.urlReenviarSms).toEqual(apiUrl + '/reenviar/sms');
        });

        it('urlEnviarDadosPessoais should be equal to /dadospessoais', () => {
            expect(ConfigurationService.urlEnviaDadosPessoais).toEqual(apiUrl + '/dadospessoais');
        });

    });
})();
