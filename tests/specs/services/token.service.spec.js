(() => {
    'use strict';

    let toSend = {
            Token: 1234,
            UidCarrinho: '0110110'
        },
        TokenService,
        MockService;

    describe('Service: TokenService', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            TokenService = $injector.get('TokenService');
        }));

        it('service should be defined', () => {
            expect(TokenService).toBeDefined();
        });

    });

    describe('Service: TokenService Methods', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.isEnabled = false;
            TokenService = $injector.get('TokenService');
            spyOn(TokenService, 'confirmarSms').and.callThrough();
            spyOn(TokenService, 'reenviarSms').and.callThrough();
        }));

        it('confirmarSms method should be working', () => {
            TokenService.confirmarSms(toSend);
            expect(TokenService.confirmarSms).toHaveBeenCalled();
        });

        it('reenviarSms method should be working', () => {
            TokenService.reenviarSms(toSend);
            expect(TokenService.reenviarSms).toHaveBeenCalled();
        });

    });

    describe('Service: TokenService Methods Mock', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.isEnabled = true;
            TokenService = $injector.get('TokenService');
            spyOn(TokenService, 'confirmarSms').and.callThrough();
            spyOn(TokenService, 'reenviarSms').and.callThrough();
        }));

        it('confirmarSms method should be working', () => {
            TokenService.confirmarSms(toSend);
            expect(TokenService.confirmarSms).toHaveBeenCalled();
        });

        it('reenviarSms method should be working', () => {
            TokenService.reenviarSms(toSend);
            expect(TokenService.reenviarSms).toHaveBeenCalled();
        });

    });
})();
