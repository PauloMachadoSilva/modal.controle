(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: Sidebar', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaSidebar', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should method $onInit working', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

        it('should default variables defined', function() {
            expect(controller.sidebarType).toBeDefined();
            expect(typeof controller.sidebarType).toBe('string');
        });

    });


})();
