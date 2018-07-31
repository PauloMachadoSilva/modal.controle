(function() {
    'use strict';

    angular
        .module('oi.controle')
        .directive('onlyLetters', onlyLetters);

    /* @ngInject */
    function onlyLetters($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(inputValue) {

                var reg = /[^-'a-zA-Z\u00C0-\u017F\s]/;
                var replace = inputValue.replace(reg, '');

                if (replace !== inputValue) {
                    ctrl.$setViewValue(replace);
                    ctrl.$render();
                }

                return replace;
            });
        };
    };
})();
