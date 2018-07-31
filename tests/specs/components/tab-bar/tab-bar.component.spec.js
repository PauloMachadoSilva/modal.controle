(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: TabBar', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaTabBar', {
                $scope: scope
            },{
                inactive: false
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should defined bindings', function() {
            expect(controller.inactive).toBeDefined();
            expect(typeof controller.inactive).toBe('boolean');
        });

    });


})();
