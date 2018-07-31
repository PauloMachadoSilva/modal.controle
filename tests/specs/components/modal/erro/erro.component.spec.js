(() => {
    'use strict';

    let scope,
        controller,
        ConfigurationService,
        httpBackend,
        StorageService;

    describe('Component: Modal / Erro', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            ConfigurationService = $injector.get('ConfigurationService');
            httpBackend = $injector.get('$httpBackend');
            StorageService.set('DTO',{
                uidSession: '1234'
            });
            scope = $rootScope.$new();
            controller = $componentController('wzaErro', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.dto).toBeDefined();
            expect(typeof controller.dto).toBe('object');
            expect(controller.erroType).toBeUndefined();
        });

        it('should method $onInit working', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

        it('should working with erroType 34', function() {
            controller.dto = {
                uidSession: '1234',
                sku: 'OC00001R2_MIGRACAO',
                plan: {},
                currentStep: 34
            };
            controller.$onInit();
        });

        it('should working with erroType 36', function() {
            controller.dto = {
                uidSession: '1234',
                sku: 'OC00001R2_MIGRACAO',
                plan: {},
                currentStep: 36
            };
            controller.$onInit();
        });

        it('should working with erroType 35', function() {
            controller.dto = {
                uidSession: '1234',
                sku: 'OC00001R2_MIGRACAO',
                plan: {},
                currentStep: 35
            };
            controller.$onInit();
            controller.dto.sku = 'OC00002R2_MIGRACAO';
            controller.$onInit();
            controller.dto.sku = 'OC00002R2_MIGRACAO';
            controller.$onInit();
            controller.dto.sku = 'OC00003R2_MIGRACAO';
            controller.$onInit();
        });

        it('should working with erroType 40', function() {
            controller.dto = {
                uidSession: '1234',
                sku: 'OC00001R2_MIGRACAO',
                plan: {},
                currentStep: 40
            };
            controller.$onInit();
        });

        it('should method goToCreditCardFlux working', function() {
            expect(controller.goToCreditCardFlux).toBeDefined();
            expect(typeof controller.goToCreditCardFlux).toBe('function');
            controller.goToCreditCardFlux();
        });

        it('should method goToCreditCardView working', function() {
            expect(controller.goToCreditCardView).toBeDefined();
            expect(typeof controller.goToCreditCardView).toBe('function');
            controller.goToCreditCardView();
        });

        it('should method sendLead defined', function() {
            controller.dto = {
                uidSession: '1234',
                sku: 'OC00001R2_MIGRACAO',
                plan: {},
                currentStep: 34
            };
            expect(controller.sendLead).toBeDefined();
            expect(typeof controller.sendLead).toBe('function');
        });

        it('should method trackOiPosOffer  defined', function() {
            expect(controller.trackOiPosOffer ).toBeDefined();
            expect(typeof controller.trackOiPosOffer ).toBe('function');
            controller.trackOiPosOffer();
        });

        xit('should method sendLead working', function() {
            let dto ={
                    telefone: '13988736467',
                    nome: 'Teste Nome',
                    email: 'email@email.com',
                    sku: 'OCCP005R1_MIGRACAO',
                    plan: {}
                },
                carrinho = {
                    CodigoSku: 'OCCP005R1_MIGRACAO',
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com'
                    },
                    LinhaServico: '988736467',
                    DddServico: '13',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidSession: '1234',
                    View: 'Ofertar Cartao'
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                        ProximoPasso: 8
                    }
                };


            httpBackend.expectPOST(ConfigurationService.urlCarrinho, carrinho).respond(response);

            controller.dto = dto;
            controller.sendLead();

            httpBackend.flush();
        });

        xit('should method sendLead fail cover', function() {
            let dto ={
                    telefone: '21999999999',
                    nome: 'Teste Nome',
                    email: 'email@email.com',
                    sku: 'OCCP005R1_MIGRACAO',
                    plan: {}
                },
                carrinho = {
                    CodigoSku: 'OCCP005R1_MIGRACAO',
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com'
                    },
                    LinhaServico: '999999999',
                    DddServico: '21',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidSession: '1234',
                    View: 'Ofertar Cartao'
                },
                response = {
                    mensagem: 'Validação - Linha não Elegivel.',
                    retorno: {
                        UidCarrinho: null,
                        ProximoPasso: 34,
                        ProximoPassoDescricao: 'Ofertar Pós'
                    }
                };


            httpBackend.expectPOST(ConfigurationService.urlCarrinho, carrinho).respond(422, response);

            controller.dto = dto;
            controller.sendLead();

            httpBackend.flush();
        });

    });

})();
