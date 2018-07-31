(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;


    describe('Directive: Nome', () => {
        application.initModule();


        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="name" ng-model="name" custom-name-validator>' +
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

        it('Diretiva com valor', () => {
            setValue('Teste Nome');
            expect(scope.name).not.toBeNull();
            expect(scope.name).not.toBeNaN();
        });

        it('Nome deve ser string', () => {
            setValue('Teste Nome');
            expect(scope.name).toEqual(jasmine.any(String));
        });

        it('Nome deve ser válido', () => {
            setValue('Teste Nome');
            expect(scope.name).toMatch(/[-'a-zA-Z\u00C0-\u017F]{2,}[\s]{1,}[a-zA-Z\u00C0-\u017F]{2,}.*/);
        });

        it('Nome deve ser inválido', () => {
            setValue('Teste 123 Nome');
            expect(scope.name).not.toMatch(/[-'a-zA-Z\u00C0-\u017F]{2,}[\s]{1,}[a-zA-Z\u00C0-\u017F]{2,}.*/);
        });

        describe('Directive: Nome vazio', () => {

            beforeEach(inject(($rootScope, $compile) => {
                scope = $rootScope.$new();
                element = angular.element('<form name="testForm">' +
                                '<input type="text" name="name" ng-model="name" custom-name-validator allow-empty="">' +
                            '</form>');
                element = $compile(element)(scope);
                input = element.find('input');
            }));

            it('Nome deve ser válido vazio', () => {
                setValue('');
            });

        });

    });



})();
