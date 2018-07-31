(function() {
    'use strict';

    angular
        .module('oi.controle')
        .directive('formValidator', formValidator);

    /* @ngInject */
    function formValidator($parse) {

        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {

            var
                field = element.parent(),
                validacao = element.parent().children()[0];

            field.on('click', function(){
                element[0].focus();
            });

            element.on('blur', function() {
                if (scope.$ctrl && scope.$ctrl.errorMessages) {
                    scope.$ctrl.errorMessages = {};
                }

                if (!ctrl.$valid && this.value.length > 0) {
                    validacao.classList.add('visivel');
                    validacao.innerHTML = 'Campo inválido';
                } else if (this.value.length == 0) {
                    validacao.classList.add('visivel');
                    validacao.innerHTML = 'Campo obrigatório';
                } else if (ctrl.$valid) {
                    validacao.classList.remove('visivel');
                    validacao.innerHTML = '';
                }
                scope.$apply();
            });
        }
    }
})();
