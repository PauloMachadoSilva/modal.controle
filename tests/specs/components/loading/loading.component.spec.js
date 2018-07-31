(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: Loading', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaLoading', {
                $scope: scope
            },{
                telefone: '21999999999'
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should defined bindings', function() {
            expect(controller.telefone).toBeDefined();
            expect(typeof controller.telefone).toBe('string');
        });

        it('should method $onInit working', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

    });


})();
