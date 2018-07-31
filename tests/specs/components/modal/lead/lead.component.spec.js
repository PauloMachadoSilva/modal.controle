(() => {
    'use strict';

    let scope,
        controller,
        StorageService,
        ConfigurationService,
        httpBackend;

    describe('Component: Modal / Lead', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            ConfigurationService = $injector.get('ConfigurationService');
            httpBackend = $injector.get('$httpBackend');
            StorageService.set('DTO', {
                uidSession: '1234',
                sku: 'OC00001NA_MIGRACAO'
            });
            scope = $rootScope.$new();
            controller = $componentController('wzaLead', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.isLoading).toBeDefined();
            expect(typeof controller.isLoading).toBe('boolean');
            expect(controller.lead).toBeDefined();
            expect(typeof controller.lead).toBe('object');
        });

        it('should method onInit defined', function() {
            expect(controller.$onInit).toBeDefined();
            expect(typeof controller.$onInit).toBe('function');
            controller.$onInit();
        });

        it('should method sendLead defined', function() {
            expect(controller.sendLead).toBeDefined();
            expect(typeof controller.sendLead).toBe('function');
        });

        xit('should method sendLead working', function() {
            let lead = {
                    telefone: '13988736467',
                    nome: 'Teste Nome',
                    email: 'email@email.com'
                },
                carrinho = {
                    CodigoSku: 'OC00001NA_MIGRACAO',
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com'
                    },
                    LinhaServico: '988736467',
                    DddServico: '13',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidSession: '1234',
                    View: 'Lead',
                    Utm: {}
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                        ProximoPasso: 8
                    }
                };


            httpBackend.expectPOST(ConfigurationService.urlCarrinho, carrinho).respond(response);

            controller.lead = lead;
            controller.sendLead();

            httpBackend.flush();
        });

        xit('should method sendLead fail cover', function() {
            let lead = {
                    telefone: '2199999999',
                    nome: 'Teste Nome',
                    email: 'email@email.com'
                },
                carrinho = {
                    CodigoSku: 'OC00001NA_MIGRACAO',
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com'
                    },
                    LinhaServico: '99999999',
                    DddServico: '21',
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidSession: '1234',
                    View: 'Lead',
                    Utm: {}
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

            controller.lead = lead;
            controller.sendLead();

            httpBackend.flush();
        });

    });


})();
