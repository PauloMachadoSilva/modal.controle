(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;


    describe('Directive: Email', () => {
        application.initModule();


        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="age" ng-model="email" custom-email-validator>' +
                        '</form>');
            element = $compile(element)(scope);
            input = element.find('input');
        }));

        function setValue(value) {
            scope.email = value;
            scope.testForm.age.$setViewValue(value);
            scope.$apply();
            browserTrigger(input, 'keyup');
        }

        it('Diretiva iniciada', () => {
            expect(element).toBeDefined();
        });

        it('Diretiva com valor', () => {
            setValue('email@dominio.com');
            expect(scope.email).not.toBeNull();
            expect(scope.email).not.toBeNaN();
        });

        it('Email deve ser válido', () => {
            setValue('email@dominio.com');
            expect(scope.email).toMatch(/^[a-zA-Z0-9\._-]{3,}@([a-zA-Z0-9\._-]{2,}\.)[a-zA-Z-0-9]{2,3}/);
        });

        it('Email deve ser inválido', () => {
            setValue('e@d.com');
            expect(scope.email).not.toMatch(/^[a-zA-Z0-9\._-]{3,}@([a-zA-Z0-9\._-]{2,}\.)[a-zA-Z-0-9]{2,3}/);
        });
    });

})();
