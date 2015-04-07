/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('jQuery', () => {

    var jQueryStatic: JQueryStatic;

    beforeEach((): void => {
        angular.mock.module('app');

        angular.mock.inject([
            'jQuery',
            (_jQuery) => {
                jQueryStatic = _jQuery;
            }
        ]);

    });

    it('has a modal function', () => {
        expect(typeof (jQueryStatic('body').modal)).to.equal('function');
    });

    it('is properly defined', () => {
        expect(jQueryStatic).to.not.equal(null);
        expect(typeof jQueryStatic).to.equal('function');
    });

});
