(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;


    describe('Directive: Apenas Letras', () => {
        application.initModule();

        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="name" ng-model="name" only-letters>' +
                        '</form>');
            element = $compile(element)(scope);
            input = element.find('input');
        }));

        function setValue(value) {
            scope.name = value;
            scope.testForm.name.$setViewValue(value);
            scope.$apply();
            browserTrigger(input, 'keyup');
        }

        it('Diretiva iniciada', () => {
            expect(element).toBeDefined();
        });

        it('Diretiva com valor válido', () => {
            setValue('Teste Nome');
            expect(scope.name).toBe('Teste Nome');
        });

        it('Diretiva removendo números', () => {
            setValue('Teste1 Nome');
            expect(scope.name).toBe('Teste Nome');
        });

    });



})();
