(() => {
    'use strict';

    let scope,
        controller;

    describe('Component: Tab', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            scope = $rootScope.$new();
            controller = $componentController('wzaTab', {
                $scope: scope
            },{
                name: 'Dados Pessoais',
                active: true,
                state: 'DadosPessoais',
                completed: false
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should defined bindings', function() {
            expect(controller.name).toBeDefined();
            expect(typeof controller.name).toBe('string');
            expect(controller.state).toBeDefined();
            expect(typeof controller.state).toBe('string');
            expect(controller.active).toBeDefined();
            expect(typeof controller.active).toBe('boolean');
            expect(controller.completed).toBeDefined();
            expect(typeof controller.completed).toBe('boolean');
        });

        it('should defined methods', function() {
            expect(controller.goTo).toBeDefined();
            expect(typeof controller.goTo).toBe('function');
            controller.goTo(controller.state);
        });

    });


})();
