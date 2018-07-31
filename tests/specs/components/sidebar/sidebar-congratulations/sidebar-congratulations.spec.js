(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: Sidebar Parabens', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaSidebarCongratulations', {
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

    });


})();
