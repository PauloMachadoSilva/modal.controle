(() => {
    'use strict';

    let carrinho = {
            CodigoSku: 'OC00001NA_MIGRACAO',
            DadosPessoais: {
                Nome: 'Teste Nome',
                Email: 'email@email.teste.com'
            },
            LinhaServico: '999999999',
            DddServico: '21'
        },
        CarrinhoService,
        MockService;

    describe('Service: Carrinho', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            CarrinhoService = $injector.get('CarrinhoService');
        }));

        it('Carrinho Service should be defined', () => {
            expect(CarrinhoService).toBeDefined();
        });

    });

    describe('Service: Carrinho Methods', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.isEnabled = false;
            CarrinhoService = $injector.get('CarrinhoService');
            spyOn(CarrinhoService, 'novoCarrinho').and.callThrough();
        }));

        it('novoCarrinho method should be working', () => {
            CarrinhoService.novoCarrinho(carrinho);
            expect(CarrinhoService.novoCarrinho).toHaveBeenCalled();
        });

    });

    describe('Service: Carrinho Methods Mock', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            MockService = $injector.get('MockService');
            MockService.isEnabled = true;
            CarrinhoService = $injector.get('CarrinhoService');
            spyOn(CarrinhoService, 'novoCarrinho').and.callThrough();
        }));

        it('novoCarrinhoMock method should be working', () => {
            CarrinhoService.novoCarrinho(carrinho);
            expect(CarrinhoService.novoCarrinho).toHaveBeenCalled();
        });

        it('novoCarrinhoMock with Teste Cartao method should be working', () => {
            carrinho.DadosPessoais.Nome = 'Teste Cartao';
            CarrinhoService.novoCarrinho(carrinho);
            expect(CarrinhoService.novoCarrinho).toHaveBeenCalled();
        });

        it('novoCarrinhoMock with Teste Oferta Oi Pos method should be working', () => {
            carrinho.DadosPessoais.Nome = 'Teste Oferta Oi Pos';
            CarrinhoService.novoCarrinho(carrinho);
            expect(CarrinhoService.novoCarrinho).toHaveBeenCalled();
        });

    });
})();
