'use strict';

var application = {
    initModule: function initModule() {
        beforeEach(() => {
            module('oi.controle');
        });
    }
};

describe('Module: oi.controle', () => {
    var module,
        dependencies = [];

    const hasModule = module => dependencies.indexOf(module) >= 0;

    application.initModule();

    it('Defined Modules', () => {
        expect(hasModule('oi.controle')).toBeDefined();
    });
});
