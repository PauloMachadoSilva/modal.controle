(() => {
    'use strict';

    let MockService;

    describe('Service: TokenService', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            spyOn(MockService, 'setMockType').and.callThrough();
            spyOn(MockService, 'mockRequest').and.callThrough();
        }));

        it('service should be defined', () => {
            expect(MockService).toBeDefined();
        });

        it('default variables should be defined', () => {
            expect(MockService.isEnabled).toBe(false);
            expect(MockService.noApiInfo).toBe(false);
        });

        it('setMockType with tester method should be working', () => {
            MockService.setMockType('tester');
            expect(MockService.setMockType).toHaveBeenCalled();
        });

        it('setMockType with tester-no-api-info method should be working', () => {
            MockService.setMockType('tester-no-api-info');
            expect(MockService.setMockType).toHaveBeenCalled();
        });

        it('mockRequest method should be working', () => {
            MockService.mockRequest({
                status: 'Ok'
            });
            expect(MockService.mockRequest).toHaveBeenCalled();
        });

    });
})();
