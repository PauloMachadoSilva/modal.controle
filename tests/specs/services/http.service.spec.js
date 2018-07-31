(() => {
    'use strict';

    describe('Service: HttpService', () => {
        application.initModule();
        var $rootScope,
            HttpService,
            StorageService,
            objeto = {
                Uid: '0101'
            },
            url = 'http//esb.webapidev.cd.com/v1/api/produto/ClaroModal/listar/planos';

        beforeEach(inject(($injector) => {
            HttpService = $injector.get('HttpService');
            StorageService = $injector.get('StorageService');
            spyOn(HttpService, 'get').and.callThrough();
            spyOn(HttpService, 'post').and.callThrough();
            spyOn(HttpService, 'put').and.callThrough();
        }));

        it('Http Service should be defined', () => {
            expect(HttpService).toBeDefined();
        });

        it('get method shoud be working', () => {
            HttpService.get(url);
            expect(HttpService.get).toHaveBeenCalled();
        });

        it('post method shoud be working', () => {
            HttpService.post(url, objeto);
            expect(HttpService.post).toHaveBeenCalled();
        });

        it('put method shoud be working', () => {
            HttpService.put(url, objeto);
            expect(HttpService.put).toHaveBeenCalled();
        });

        it('$rootScope.codigoOrigem has been working', () => {
            HttpService.put(url, objeto);
            expect(HttpService.put).toHaveBeenCalled();
        });
    });
})();
