describe('Mobile Service', () => {
    application.initModule();
    var MobileService;

    beforeEach(inject(($injector) => {
        MobileService = $injector.get('MobileService');
    }));

    it('Mobile Service should be defined', () => {
        expect(MobileService).toBeDefined();
    });

    it('isMobile variable has been defined', () => {
        expect(MobileService.isMobile).toBeDefined();
    });
});
