(() => {
    'use strict';

    let scope,
        controller,
        StorageService;

    describe('Component: wzaHome', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            scope = $rootScope.$new();
            controller = $componentController('wzaHome', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.dto).toBeDefined();
            expect(typeof controller.dto).toBe('object');
        });

        it('should method $onInit with storage working', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

        it('should method $onInit with currentStep working', function() {
            controller.dto.currentStep = 9;
            controller.$onInit();
        });

        it('should method $onInit without sku working', function() {
            controller.dto.sku = '';
            controller.$onInit();
        });

        it('should method close working', function() {
            expect(controller.close).toBeDefined();
            expect(typeof controller.close).toBe('function');
        });

    });


})();
