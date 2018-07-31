(() => {
    'use strict';

    describe('Service: ParametersService', () => {
        application.initModule();

        var ParametersService;

        beforeEach(inject(function($injector) {
            ParametersService = $injector.get('ParametersService');
        }));

        it('Service has Defined', () => {
            expect(ParametersService).toBeDefined();
            expect(ParametersService.parametros).toBeDefined();
            expect(ParametersService.analytics).toBeDefined();
            expect(ParametersService.bko).toBeDefined();
            expect(ParametersService.configProjeto).toBeDefined();
        });
    });
})();
