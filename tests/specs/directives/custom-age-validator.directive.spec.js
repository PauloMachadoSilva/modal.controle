(() => {
    'use strict';

    let element,
        input,
        scope,
        valor,
        model;

    describe('Directive: Idade', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<input type="text" name="age" ng-model="model" custom-age-validator>' +
                        '</form>');
            element = $compile(element)(scope);
            input = element.find('input');
        }));

        function setValue(value) {
            scope.model = value;
            scope.testForm.age.$setViewValue(value);
            scope.$apply();
            browserTrigger(input, 'keyup');
        }

        it('Diretiva iniciada', () => {
            expect(input).toBeDefined();
        });

        it('Diretiva com valor', () => {
            setValue('31/01/1989');
            model = scope.model;
            expect(model).not.toBeNull();
            expect(model).not.toBeNaN();
        });

        it('Dia inválido', () => {
            valor = '35/01/1989';
            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(false);
        });

        it('Mês inválido', () => {
            valor = '31/13/1989';
            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(false);
        });

        it('Ano inválido', () => {
            valor = '31/01/1000';
            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(false);
        });

        it('Menor de 18 anos', () => {
            valor = '01/08/2030';
            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(false);
        });

        it('Fez 18 anos hoje', () => {
            var date = new Date();
            var day = date.getDate();
            var month = date.getMonth() + 1;

            valor =  (day < 10 ? '0' + day : day)+ '/'
                + (month < 10 ? '0' + month : month) + '/'
                + (date.getFullYear() - 18);

            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(true);
        });

        it('Tem mais de 18 anos', () => {
            valor = '01/01/1980';
            setValue(valor);
            model = scope.model;
            expect(model).toBe(valor);
            expect(scope.testForm.age.$valid).toBe(true);
        });

    });


})();
