(function() {
    'use strict';

    angular
        .module('oi.controle')
        .directive('customAgeValidator', customAgeValidator);

    customAgeValidator.$inject = ['$parse'];

    function customAgeValidator($parse) {
        var directive = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            element.bind('keyup', function() {
                var birth = ctrl.$viewValue.split('/').reverse().join('-');
                var today = new Date();
                var birthDate;
                var age;
                var m;

                if(birth.length === 10) {
                    birthDate = new Date(birth + 'T00:00:00');

                    if (isNaN(birthDate.getTime())) {
                        element.addClass('error-age');
                        ctrl.$setValidity('ageValid', false);
                        return;
                    }

                    age = today.getFullYear() - birthDate.getFullYear();
                    m = today.getMonth() - birthDate.getMonth();

                    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }

                    if (age < 18 || age > 130) {
                        element.addClass('error-age');
                        ctrl.$setValidity('ageValid', false);
                    } else {
                        element.removeClass('error-age');
                        ctrl.$setValidity('ageValid', true);
                    }
                }
            });
        };
    };
})();
