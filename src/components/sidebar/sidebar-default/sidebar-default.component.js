(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaSidebarDefault', {
            controller: SidebarDefaultComponentController,
            bindings: {
                dto: '<',
                bonus: '<',
                description: '=',
                complement: '='
            },
            templateUrl: '/components/sidebar/sidebar-default/sidebar-default.template.html'
        });

    /* @ngInject */
    function SidebarDefaultComponentController(MobileService) {
        var $ctrl = this;

        $ctrl.isMobile = MobileService.isMobile;

        $ctrl.expandInfo = expandInfo;

        function expandInfo(e) {
            var sidebar = document.querySelector('.modal .sidebar'); // eslint-disable-line angular/document-service

            if (sidebar.className.indexOf('-open') > -1) {
                sidebar.classList.remove('-open');
            } else {
                sidebar.classList.add('-open');
            }
        };
    }

})();
