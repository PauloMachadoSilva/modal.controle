(function() {
    'use strict';

    angular.module('oi.controle')
        .component('wzaParabens', CongratulationsComponent());

    function CongratulationsComponent() {
        var component = {
            controller: CongratulationsComponentController,
            templateUrl: '/pages/home/parabens/parabens.template.html'
        };

        return component;
    }

    /* @ngInject */
    function CongratulationsComponentController($analytics, $state, StorageService, AnalyticalLogService) {
        var $ctrl = this;
        var _dto = StorageService.get('DTO') || {};
        var _oiuid = StorageService.get('oiuid');

        $ctrl.dto = _dto;
        $ctrl.congratulationsType;
        $ctrl.description = StorageService.get('Description');

        $ctrl.$onInit = activate;
        $ctrl.goToHome = goToHome;

        function _setCongratulationsType() {
            if ($ctrl.dto.currentStep === 9) {
                $analytics.pageTrack('/parabens');
                AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
                $ctrl.congratulationsType = 'parabens';
            } else if ($ctrl.dto.currentStep === 41) {
                $analytics.pageTrack('/parabens-semsaldo');
                AnalyticalLogService.sendUid($ctrl.dto, 1, null, $ctrl.dto.currentStepName);
                $ctrl.congratulationsType = 'parabens-sem-saldo';
            }
        }

        function _deleteDTO() {
            var backupUid = {
                uidSession: _dto.uidSession
            };
            StorageService.set('DTO', backupUid);
        }

        function _injectAffiliatesScript() {

            var paymentMethod = $ctrl.dto.paymentMethod,
                originKey = $ctrl.dto.orderKey,
                script = document.createElement('script'),
                firstScriptTag = document.getElementsByTagName('script')[0];

            if($ctrl.dto.paymentMethod === 'creditcard'){
                script.src = 'https://cdaf.com.br/p.ashx?o=20&e=1&f=js&t=' + originKey;
                firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

            }else{
                script.src = 'https://cdaf.com.br/p.ashx?o=25&e=1&f=js&t=' + originKey;
                firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
            }
        }

        function activate() {
            _setCongratulationsType();
            _injectAffiliatesScript();
            _deleteDTO();
        }

        function goToHome() {
            $state.go('Main');
        }

    }

})();
