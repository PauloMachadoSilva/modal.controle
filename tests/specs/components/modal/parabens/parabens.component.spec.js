(() => {
    'use strict';

    let scope,
        controller,
        StorageService;

    describe('Component: Modal / Parabens', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            scope = $rootScope.$new();
            controller = $componentController('wzaParabens', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.dto).toBeDefined();
            expect(typeof controller.dto).toBe('object');
            expect(controller.congratulationsType).toBeUndefined();
        });

        it('should method $onInit working', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

        it('should working with congratulationsType 9', function() {
            controller.dto.currentStep = 9;
            controller.$onInit();
        });

        it('should working with congratulationsType 41', function() {
            controller.dto.currentStep = 41;
            controller.$onInit();
        });

        it('should method goToHome working', function() {
            expect(controller.goToHome).toBeDefined();
            expect(typeof controller.goToHome).toBe('function');
            controller.goToHome();
        });

    });


})();
