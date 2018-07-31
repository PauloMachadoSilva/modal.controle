(function() {
    'use strict';

    angular
        .module('number.directive', [])
        .directive('numberValidator', numberValidator);

    /* @ngInject */
    function numberValidator($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(inputValue) {

                if (!inputValue) {
                    return '';
                }

                var transformedInput = inputValue.replace(/[^0-9]/g, '');

                if (transformedInput !== inputValue) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }

                return transformedInput;
            });
        };
    };
})();
