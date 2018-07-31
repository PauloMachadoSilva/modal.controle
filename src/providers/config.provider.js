(function() {
    'use strict';

    angular
        .module('oi.controle')
        .provider('configuration', configurationProvider);

    function configurationProvider() {
        var dev = /^dev\./,
            hmg = /^hmg\./,
            hmgInterno = /^hmg-/,
            host = location.hostname,
            local = /^localhost/,
            localIp = /^10\.17\.2\./,
            CODIGO_OPERADORA = 0,
            VENDEDOR_USUARIO,
            apiPath = '/v1/api/oi/controlefatura',
            apiPathDefault = '/v1/api',
            DOMINIO = {
                dev: '//esb.webapidev.cd.com/oi',
                homolog: '//esb.webapihmg.cd.com/oi',
                homologInterno: '//gtw-hmg-interno.celular.com.br:8090',
                prod: 'https://gtw.celular.com.br'
            },
            ENV = setAmbiente(host),
            CODIGO_ORIGEM = {
                billet: {
                    chat: 'fc396e1562134ed891c5b4fc24d95b17',
                    default: '6f799ab82ec64bdbaf020175494c9848',
                    voice: '688ec3fadbca46db9dc6dfaa17e532ff'
                },

                creditcard       : '6f799ab82ec64bdbaf020175494c9848',
                boleto           : '04e6c945a5b04d6aaa116f9b96c07661'
            },
            TOKEN = {
                dev           : '9ec365a9a6664414ac8927b1bda4744c',
                homolog       : 'c787dc81a50b467ca19d9eba7572c684',
                homologInterno: 'c787dc81a50b467ca19d9eba7572c684',
                prod          : 'c325452a3cf7473e85d375faca1ee812'
            };

        // metodos publicos
        function setAmbiente(ambiente) {
            if (local.test(ambiente) || localIp.test(ambiente) || dev.test(ambiente)) {
                return 'dev';
            } else if (hmg.test(ambiente)) {
                return 'homolog';
            } else if (hmgInterno.test(ambiente)) {
                return 'homologInterno';
            }

            return 'prod';
        };

        function setOperadora(codigo) {
            CODIGO_OPERADORA = codigo;
            return CODIGO_OPERADORA;
        };

        function setVendedor(vendedor) {
            VENDEDOR_USUARIO = vendedor;
            return VENDEDOR_USUARIO;
        };

        function getDados() {
            return Object.freeze({
                codigoOrigem: CODIGO_ORIGEM,
                codigoOperadora: CODIGO_OPERADORA,
                vendedorUsuario: VENDEDOR_USUARIO,
                token: TOKEN[ENV],
                baseUrl: DOMINIO[ENV],
                apiUrl: DOMINIO[ENV] + apiPath,
                apiDefault : DOMINIO[ENV] + apiPathDefault,
                ambiente: ENV
            });
        };

        return {
            setAmbiente: setAmbiente,
            setOperadora: setOperadora,
            setVendedor: setVendedor,
            $get: getDados
        };
    };
}());
