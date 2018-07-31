(() => {
    'use strict';

    describe('Provider: ConfigurationProvider', () => {
        var codeCompany,
            saleVendor,
            configuration,
            configurationGet,
            environment,
            host;

        beforeEach(() => {
            // Mock a module and config to take the provider and your methods
            angular.module('test.config', []);
            angular.module('test.config').config(testConfig);

            function testConfig(configurationProvider) {
                configuration = configurationProvider;
            };

            module('oi.controle', 'test.config');

            // get the $get of provider
            inject(($injector) => {
                configurationGet = $injector.get('configuration');
            });
        });

        it('Configuration has Defined', () => {
            expect(configuration).toBeDefined();
        });

        it('Localhost environment has ok', () => {
            host = 'localhost';
            environment = configuration.setAmbiente(host);
            expect(environment).toEqual('dev');
        });

        it('Development environment has ok', () => {
            host = 'dev.celular.com.br';
            environment = configuration.setAmbiente(host);
            expect(environment).toEqual('dev');
        });

        it('Homolog environment has ok', () => {
            host = 'hmg.celular.com.br';
            environment = configuration.setAmbiente(host);
            expect(environment).toEqual('homolog');
        });

        it('Homolog internal environment has ok', () => {
            host = 'hmg-celular.com.br';
            environment = configuration.setAmbiente(host);
            expect(environment).toEqual('homologInterno');
        });

        it('Production environment has ok', () => {
            host = 'anything.celular.com.br';
            environment = configuration.setAmbiente(host);
            expect(environment).toEqual('prod');
        });

        it('Infos to equal develop values', () => {
            expect(configurationGet.codigoOrigem).toEqual({
                billet: {
                    chat: 'fc396e1562134ed891c5b4fc24d95b17',
                    default: '6f799ab82ec64bdbaf020175494c9848',
                    voice: '688ec3fadbca46db9dc6dfaa17e532ff'
                },
                creditcard       : '6f799ab82ec64bdbaf020175494c9848',
                boleto           : '04e6c945a5b04d6aaa116f9b96c07661'
            });
            expect(configurationGet.token).toEqual('9ec365a9a6664414ac8927b1bda4744c');
            expect(configurationGet.baseUrl).toEqual('//esb.webapidev.cd.com/oi');
            expect(configurationGet.apiUrl).toEqual('//esb.webapidev.cd.com/oi/v1/api/oi/controlefatura');
        });

        it('CODIGO_OPERADORA not equal to initial value when the setOperadora is evocated', () => {
            codeCompany = configuration.setOperadora(31);
            expect(codeCompany).not.toEqual(0);
            expect(codeCompany).toEqual(31);
        });

        it('VENDEDOR_USUARIO', () => {
            saleVendor = configuration.setVendedor('mol.oi');
            expect(saleVendor).not.toEqual(undefined);
            expect(saleVendor).toEqual('mol.oi');
        });
    });
})();
