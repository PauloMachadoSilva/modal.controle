(() => {
    'use strict';

    let scope,
        controller,
        StorageService,
        ConfigurationService,
        httpBackend;

    describe('Component: Modal / Dados Pessoais', () => {
        application.initModule();

        beforeEach(inject(($injector, $componentController, $rootScope) => {
            StorageService = $injector.get('StorageService');
            ConfigurationService = $injector.get('ConfigurationService');
            httpBackend = $injector.get('$httpBackend');
            StorageService.set('DTO', {
                uidSession: '1234',
                uidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                currentStep: 2,
                currentStepName: 'Dados Pessoais',
            });
            scope = $rootScope.$new();
            controller = $componentController('wzaDadosPessoais', {
                $scope: scope
            });
        }));

        it('should defined controller', function() {
            expect(controller).toBeDefined();
        });

        it('should default variables defined', function() {
            expect(controller.dadosPessoais).toBeDefined();
            expect(typeof controller.dadosPessoais).toBe('object');
            expect(controller.errorMessages).toBeDefined();
            expect(typeof controller.errorMessages).toBe('object');
            expect(controller.isLoading).toBeDefined();
            expect(typeof controller.isLoading).toBe('boolean');
            expect(controller.isCreditcard).toBeDefined();
            expect(typeof controller.isCreditcard).toBe('boolean');
        });

        it('should method sendDadosPessoais defined', function() {
            expect(controller.sendDadosPessoais).toBeDefined();
            expect(typeof controller.sendDadosPessoais).toBe('function');
        });

        xit('should method sendDadosPessoais working', function() {
            let dadosPessoais = {
                    nome: 'Teste Nome',
                    email: 'email@email.com',
                    numero: '21999999999',
                    cpf: '56393155809',
                    nascimento: '25/08/1993',
                    nomeMae: 'Mae do Teste'
                },
                dataToSend = {
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com',
                        NomeMae: 'Mae do Teste',
                        Nascimento: '25/08/1993',
                        Cpf: '56393155809',
                        DddContato : '21',
                        LinhaContato : '999999999'
                    },
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Dados Pessoais'
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        ProximoPasso: 9
                    }
                };


            httpBackend.expectPUT(ConfigurationService.urlEnviaDadosPessoais, dataToSend).respond(response);

            controller.dadosPessoais = dadosPessoais;
            controller.sendDadosPessoais();

            httpBackend.flush();
        });

        xit('should method sendDadosPessoais fail cover validations', function() {
            let dadosPessoais = {
                    nome: 'Teste Nome',
                    email: 'email@email.com',
                    numero: '21999999999',
                    cpf: '56393155809',
                    nascimento: '25/08/1993',
                    nomeMae: 'Mae do Teste'
                },
                dataToSend = {
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com',
                        NomeMae: 'Mae do Teste',
                        Nascimento: '25/08/1993',
                        Cpf: '56393155809',
                        DddContato : '21',
                        LinhaContato : '999999999'
                    },
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Dados Pessoais'
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        ProximoPasso: 0,
                        ProximoPassoDescricao: null,
                    },
                    validacoes: [
                        {
                            Mensagem: 'cpf'
                        }
                    ]
                };


            httpBackend.expectPUT(ConfigurationService.urlEnviaDadosPessoais, dataToSend).respond(422, response);

            controller.dadosPessoais = dadosPessoais;
            controller.sendDadosPessoais();

            httpBackend.flush();
        });

        xit('should method sendDadosPessoais fail cover', function() {
            let dadosPessoais = {
                    nome: 'Teste Nome',
                    email: 'email@email.com',
                    numero: '21999999999',
                    cpf: '500',
                    nascimento: '25/08/1993',
                    nomeMae: 'Mae do Teste'
                },
                dataToSend = {
                    DadosPessoais: {
                        Nome: 'Teste Nome',
                        Email: 'email@email.com',
                        NomeMae: 'Mae do Teste',
                        Nascimento: '25/08/1993',
                        Cpf: '500',
                        DddContato : '21',
                        LinhaContato : '999999999'
                    },
                    CodigoOrigem: '04e6c945a5b04d6aaa116f9b96c07661',
                    VendedorUsuario: 'mol.oi',
                    UidCarrinho: 'aba460ab-e66c-4356-801b-f3f84d788d85',
                    UidSession: '1234',
                    View: 'Dados Pessoais'
                },
                response = {
                    mensagem: 'Sucesso.',
                    retorno: {
                        ProximoPasso: 34,
                        ProximoPassoDescricao: 'Ofertar Pós'
                    }
                };


            httpBackend.expectPUT(ConfigurationService.urlEnviaDadosPessoais, dataToSend).respond(422, response);

            controller.dadosPessoais = dadosPessoais;
            controller.sendDadosPessoais();

            httpBackend.flush();
        });

    });


})();
