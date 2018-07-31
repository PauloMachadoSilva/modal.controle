(() => {
    'use strict';

    let scope,
        controller,
        StorageService,
        ConfigurationService,
        httpBackend;

    describe('Component: Modal / Token', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            ConfigurationService = $injector.get('ConfigurationService');
            httpBackend = $injector.get('$httpBackend');
            StorageService.set('DTO', {
                uidSession: '1234',
                uidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                currentStep: 8,
                currentStepName: 'Envia Sms',
            });
            scope = $rootScope.$new();
            controller = $componentController('wzaToken', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.dto).toBeDefined();
            expect(typeof controller.dto).toBe('object');
            expect(controller.errorValidation).toBeDefined();
            expect(typeof controller.errorValidation).toBe('string');
            expect(controller.errorMessages).toBeDefined();
            expect(typeof controller.errorMessages).toBe('object');
            expect(controller.isLoading).toBeDefined();
            expect(typeof controller.isLoading).toBe('boolean');
            expect(controller.token).toBeUndefined();
            expect(controller.requestToken).toBeDefined();
            expect(typeof controller.requestToken).toBe('function');
            expect(controller.sendToken).toBeDefined();
            expect(typeof controller.sendToken).toBe('function');
        });

        it('should method sendToken defined', function() {
            expect(controller.sendToken).toBeDefined();
            expect(typeof controller.sendToken).toBe('function');
        });

        xit('should method sendToken working', function() {
            let token = '123456',
                dataToSend = {
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    Token: '123456',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Envia Sms'
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                        ProximoPasso: 2
                    }
                };


            httpBackend.expectPUT(ConfigurationService.urlConfirmarSms, dataToSend).respond(response);

            controller.token  = token;
            controller.sendToken();

            httpBackend.flush();
        });

        xit('should method sendToken cover validation', function() {
            let token = '123456',
                dataToSend = {
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    Token: '123456',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Envia Sms'
                },
                response = {
                    mensagem: 'Validação - Token inválido.',
                    retorno: {
                        UidCarrinho: null,
                        ProximoPasso: 0,
                        ProximoPassoDescricao: null
                    }
                };


            httpBackend.expectPUT(ConfigurationService.urlConfirmarSms, dataToSend).respond(422, response);

            controller.token  = token;
            controller.sendToken();

            httpBackend.flush();
        });

        it('should method requestToken defined', function() {
            expect(controller.requestToken).toBeDefined();
            expect(typeof controller.requestToken).toBe('function');
        });

        xit('should method requestToken cover validation', function() {
            let dataToSend = {
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Envia Sms'
                },
                response = {
                    mensagem: 'Validação - Aguarde 30 segundos para reenviar o código de acesso.',
                    retorno: {
                        UidCarrinho: null,
                        ProximoPasso: 0,
                        ProximoPassoDescricao: null
                    }
                };


            httpBackend.expectPOST(ConfigurationService.urlReenviarSms, dataToSend).respond(422, response);

            controller.requestToken();

            httpBackend.flush();
        });

    });


})();
