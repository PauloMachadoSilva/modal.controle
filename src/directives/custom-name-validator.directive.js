(function() {
    'use strict';

    angular
        .module('oi.controle')
        .directive('customNameValidator', customNameValidator);

    /* @ngInject */
    function customNameValidator($parse) {
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };
        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(inputValue) {
                var inputName = inputValue;
                var reg = /[-'a-zA-Z\u00C0-\u017F]{2,}[\s]{1,}[a-zA-Z\u00C0-\u017F]{2,}.*/;

                if (reg.test(inputName)) {
                    element.removeClass('error-name');
                    ctrl.$setValidity('nameValid', true);
                } else {
                    element.addClass('error-name');
                    ctrl.$setValidity('nameValid', false);
                }

                if (attrs.hasOwnProperty('allowEmpty') && (!inputValue || inputName == '')) {
                    element.removeClass('error-name');
                    ctrl.$setValidity('nameValid', true);
                }

                return inputName;
            });
        };
    };
})();
