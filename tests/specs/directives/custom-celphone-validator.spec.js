(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;


    describe('Directive: Cellphone', () => {
        application.initModule();

        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="cellphone" ng-model="cellphone" custom-cel-phone-validator with-area-code="">' +
                        '</form>');
            element = $compile(element)(scope);
            input = element.find('input');
        }));

        function setValue(value) {
            scope.cellphone = value;
            scope.testForm.cellphone.$setViewValue(value);
            scope.$apply();
            browserTrigger(input, 'keyup');
        }

        it('Diretiva iniciada', () => {
            expect(element).toBeDefined();
        });

        it('Diretiva com valor válido', () => {
            setValue('21999999999');
            expect(scope.cellphone).toBe('21999999999');
            expect(scope.testForm.cellphone.$valid).toBe(true);
        });

        it('Diretiva com valor inválido', () => {
            setValue('21499999999');
            expect(scope.cellphone).toBe('21499999999');
            expect(scope.testForm.cellphone.$valid).toBe(false);
        });

        it('Diretiva com ddd inválido', () => {
            setValue('07999999999');
            expect(scope.cellphone).toBe('07999999999');
            expect(scope.testForm.cellphone.$valid).toBe(false);
        });
    });



})();
