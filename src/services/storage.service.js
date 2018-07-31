(function() {
    'use strict';

    angular
        .module('oi.controle')
        .service('StorageService', StorageService);

    /* @ngInject */
    function StorageService($localStorage, $sessionStorage) {
        this.configure = configure;
        this.del = del;
        this.get = get;
        this.set = set;
        //caso precise mudar para Local Storage é só alterar a variável abaixo
        this.type = 'session';

        function configure(val) {
            this.type = val;
        };

        function del(key) {
            if (this.type === 'session') {
                return eval('delete $sessionStorage.' + key + ';');
            } else if (this.type === 'local') {
                return eval('delete $localStorage.' + key + ';');
            } else {
                return false;
            }
        };

        function get(key) {
            if (this.type === 'session') {
                return eval('$sessionStorage.' + key);
            } else if (this.type === 'local') {
                return eval('$localStorage.' + key);
            } else {
                return false;
            }
        };

        function set(key, value) {
            if (this.type === 'session') {
                $sessionStorage[key] = value;
                return $sessionStorage[key];
            } else if (this.type === 'local') {
                $localStorage[key] = value;
                return $localStorage[key];
            } else {
                return false;
            }
        };
    };
})();
