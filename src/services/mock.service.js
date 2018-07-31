(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('MockService', MockService);

    /* @ngInject */
    function MockService($q, $timeout, $window) {
        this.isEnabled = false;
        this.noApiInfo = false;

        this.setMockType = setMockType;
        this.mockRequest = mockRequest;

        function setMockType(type) {
            if (type === 'tester') {
                this.isEnabled = true;
            } else if (type === 'tester-no-api-info') {
                this.isEnabled = true;
                this.noApiInfo = true;
            }
        }

        function mockRequest(mockObj) {
            var deferred = $q.defer();

            $timeout(function() {
                deferred.resolve(mockObj);
            }, 1000);

            return deferred.promise;
        }
    };
})();
