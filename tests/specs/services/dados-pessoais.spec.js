(() => {
    'use strict';

    let toSend = {
            DadosPessoais: {
                Nome: 'Teste Nome',
                Email: 'email@email.com',
                NomeMae: 'Teste nome da Mae',
                Nascimento: '25/08/1993',
                Cpf: '144.444.444-44',
                DddContato : '21',
                LinhaContato : '999999999'
            },
            UidCarrinho: '0110110'
        },
        DadosPessoaisService,
        MockService;

    describe('Service: DadosPessoaisService', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            DadosPessoaisService = $injector.get('DadosPessoaisService');
        }));

        it('service should be defined', () => {
            expect(DadosPessoaisService).toBeDefined();
        });

    });

    describe('Service: DadosPessoaisService Methods', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.noApiInfo = false;
            DadosPessoaisService = $injector.get('DadosPessoaisService');
            spyOn(DadosPessoaisService, 'enviarDadosPessoais').and.callThrough();
        }));

        it('enviarDadosPessoais method should be working', () => {
            DadosPessoaisService.enviarDadosPessoais(toSend);
            expect(DadosPessoaisService.enviarDadosPessoais).toHaveBeenCalled();
        });

    });

    describe('Service: DadosPessoaisService Methods Mock', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.noApiInfo = true;
            DadosPessoaisService = $injector.get('DadosPessoaisService');
            spyOn(DadosPessoaisService, 'enviarDadosPessoais').and.callThrough();
        }));

        it('enviarDadosPessoais method should be working', () => {
            DadosPessoaisService.enviarDadosPessoais(toSend);
            expect(DadosPessoaisService.enviarDadosPessoais).toHaveBeenCalled();
        });

        it('enviarDadosPessoais with Teste Oferta Oi Pos method should be working', () => {
            toSend.DadosPessoais.NomeMae = 'Teste Oferta Oi Pos';
            DadosPessoaisService.enviarDadosPessoais(toSend);
            expect(DadosPessoaisService.enviarDadosPessoais).toHaveBeenCalled();
        });

        it('enviarDadosPessoais with Teste Parabens Sem Saldo method should be working', () => {
            toSend.DadosPessoais.NomeMae = 'Teste Parabens Sem Saldo';
            DadosPessoaisService.enviarDadosPessoais(toSend);
            expect(DadosPessoaisService.enviarDadosPessoais).toHaveBeenCalled();
        });

    });
})();
