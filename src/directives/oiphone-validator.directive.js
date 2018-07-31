(function() {
    'use strict';

    angular
        .module('oi.controle')
        .directive('oiPhoneValidator', oiPhoneValidator);

    /* @ngInject */
    function oiPhoneValidator($parse) {
        var directive = {
            scope: {
                withAreaCode: '@celWithAreaCode'
            },
            link: link,
            restrict: 'A',
            require: 'ngModel'
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function(inputValue) {
                var onlyNumber = inputValue;
                var onlyDdd = inputValue.substr(0, 2);

                if (attrs.hasOwnProperty('withAreaCode') && angular.isDefined(attrs.withAreaCode)) {
                    onlyNumber = inputValue.substr(2, inputValue.length);

                    var re = new RegExp(/^(11|12|13|14|15|16|17|18|19|22|21|24|27|28|31|32|33|34|35|37|38|41|42|43|44|45|46|47|48|49|51|53|54|55|61|62|63|64|65|66|67|68|69|71|73|74|75|77|79|81|82|83|84|85|86|87|88|89|91|92|93|94|95|96|97|98|99)$/mg);
                    var dddValid = re.test(onlyDdd);

                    if (dddValid) {
                        ctrl.$setValidity('dddValid', true);
                        element.removeClass('error-ddd');
                    } else {
                        ctrl.$setValidity('dddValid', false);
                        element.addClass('error-ddd');
                    }
                }

                if (onlyNumber.length === 9) {
                    var regXp = new RegExp(/^(['9']{1}[6-9]{1}[0-9]{7})$/mg);
                } else {
                    var regXp = new RegExp(/^([2-5]{1}[0-9]{7})$/mg);
                }

                var valid = regXp.test(onlyNumber);

                if (valid) {
                    ctrl.$setValidity('phoneValid', true);
                    element.removeClass('error-phone');

                } else {
                    ctrl.$setValidity('phoneValid', false);
                    element.addClass('error-phone');
                }

                return inputValue;
            });
        };
    };
})();
