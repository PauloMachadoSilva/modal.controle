(() => {
    'use strict';

    let RouterFactory;

    describe('Service: RouterFactory', () => {
        application.initModule();

        beforeEach(inject(($injector) => {
            RouterFactory = $injector.get('RouterFactory');
            spyOn(RouterFactory, 'getRouteFromId').and.callThrough();
        }));

        it('service should be defined', () => {
            expect(RouterFactory).toBeDefined();
        });

        it('getRouteFromId with id 2 method should be working', () => {
            let route = RouterFactory.getRouteFromId(2);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.DadosPessoais');
        });

        it('getRouteFromId with id 37 method should be working', () => {
            let route = RouterFactory.getRouteFromId(37);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.DadosPessoais');
        });

        it('getRouteFromId with id 8 method should be working', () => {
            let route = RouterFactory.getRouteFromId(8);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.Token');
        });

        it('getRouteFromId with id 9 method should be working', () => {
            let route = RouterFactory.getRouteFromId(9);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.Parabens');
        });

        it('getRouteFromId with id 41 method should be working', () => {
            let route = RouterFactory.getRouteFromId(41);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.ParabensSemsaldo');
        });

        it('getRouteFromId with id 36 method should be working', () => {
            let route = RouterFactory.getRouteFromId(36);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.OfertaPos');
        });

        it('getRouteFromId with id 17 method should be working', () => {
            let route = RouterFactory.getRouteFromId(17);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.DadosCartao');
        });

        it('getRouteFromId with id 34 method should be working', () => {
            let route = RouterFactory.getRouteFromId(34);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.OfertaPos');
        });

        it('getRouteFromId with id 35 method should be working', () => {
            let route = RouterFactory.getRouteFromId(35);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.OfertaCartao');
        });

        it('getRouteFromId with id 38 method should be working', () => {
            let route = RouterFactory.getRouteFromId(38);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.OfertaPos');
        });

        it('getRouteFromId with id 40 method should be working', () => {
            let route = RouterFactory.getRouteFromId(40);
            expect(RouterFactory.getRouteFromId).toHaveBeenCalled();
            expect(route).toBe('Main.Erro');
        });

    });
})();
