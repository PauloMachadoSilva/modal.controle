(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaSidebarOfferPos', {
            controller: SidebarOfferPosComponentController,
            bindings: {
                dto: '<',
                description: '=',
                complement: '='
            },
            templateUrl: '/components/sidebar/sidebar-offer-pos/sidebar-offer-pos.template.html'
        });

    /* @ngInject */
    function SidebarOfferPosComponentController(MobileService, StorageService) {
        var $ctrl = this;

        $ctrl.isMobile = MobileService.isMobile;
        $ctrl.expandInfoPos = expandInfoPos;
        $ctrl.trackOiPosOffer = trackOiPosOffer;

        function expandInfoPos(e) {
            var sidebar = document.querySelector('.modal .sidebar'); // eslint-disable-line angular/document-service
            var steps = document.querySelector('.steps'); // eslint-disable-line angular/document-service

            if (sidebar.className.indexOf('-openpos') > -1) {
                sidebar.classList.remove('-openpos');
            } else {
                sidebar.classList.add('-openpos');
            }

            if (steps.className.indexOf('-openpos') > -1) {
                steps.classList.remove('-openpos');
            } else {
                steps.classList.add('-openpos');
            }
        }

        function trackOiPosOffer() {
            AnalyticalLogService.sendUid($ctrl.dto, 12, 'Aceita oferta oi pós', $ctrl.dto.currentStepName);
        }
    }

})();
