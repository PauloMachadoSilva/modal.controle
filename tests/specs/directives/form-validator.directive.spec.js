(() => {
    'use strict';

    let element,
        input,
        validator,
        scope,
        valor,
        model;


    describe('Directive: Validacao Geral', () => {
        application.initModule();

        beforeEach(inject(($rootScope, $compile) => {
            scope = $rootScope.$new();
            element = angular.element('<form name="testForm">' +
                            '<div class="validator">' +
                                '<span class="validacao"></span>' +
                                '<input type="text" name="name" ng-model="name" custom-name-validator form-validator>' +
                            '</div>' +
                        '</form>');
            element = $compile(element)(scope);
            input = element.find('input');
            validator = element.find('span');
        }));

        function setValue(value) {
            scope.name = value;
            scope.testForm.name.$setViewValue(value);
            input[0].value = value;
            scope.$apply();
            browserTrigger(input, 'keyup');
        }

        it('Diretiva iniciada', () => {
            expect(element).toBeDefined();
        });

        it('Campo válido', () => {
            setValue('Teste name');
            browserTrigger(input, 'blur');
            expect(scope.name).toBe('Teste name');
            expect(validator[0].innerHTML).toBe('');
        });

        it('Campo obrigatório alertado', () => {
            setValue('');
            browserTrigger(input, 'blur');
            expect(scope.name).toBe('');
            expect(validator[0].innerHTML).toBe('Campo obrigatório');
        });

        it('Campo inválido alertado', () => {
            setValue('Teste 123 Nome');
            browserTrigger(input, 'blur');
            expect(scope.name).toBe('Teste 123 Nome');
            expect(validator[0].innerHTML).toBe('Campo inválido');
        });

        it('Click no validator foca campo', () => {
            browserTrigger(validator, 'click');
        });

    });



})();
