(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaSidebarCongratulations', {
            controller: SidebarCongratulationsComponentController,
            bindings: {
                dto: '<',
                bonus: '<',
                description: '=',
                complement: '='
            },
            templateUrl: '/components/sidebar/sidebar-congratulations/sidebar-congratulations.template.html'
        });

    /* @ngInject */
    function SidebarCongratulationsComponentController(MobileService) {
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
