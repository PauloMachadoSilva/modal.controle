(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;


    describe('Directive: Apenas Números', () => {
        application.initModule();

        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="name" ng-model="name" number-validator>' +
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
            setValue('1234');
            expect(scope.name).toBe('1234');
        });

        it('Diretiva removendo letras', () => {
            setValue('Teste1 Nome');
            expect(scope.name).toBe('1');
        });

        it('Diretiva com valor vazio', () => {
            setValue('');
            expect(scope.name).toBe('');
        });

    });



})();
