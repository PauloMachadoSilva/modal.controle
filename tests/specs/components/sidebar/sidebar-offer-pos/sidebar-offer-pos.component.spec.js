(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: Sidebar Oferta Pós', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaSidebarOfferPos', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.isMobile).toBeDefined();
            expect(typeof controller.isMobile).toBe('boolean');
        });

        it('should methods defined', function() {
            expect(controller.expandInfoPos).toBeDefined();
            expect(typeof controller.expandInfoPos).toBe('function');
        });

    });


})();
