/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('jQuery', () => {

    var $: JQuery;

    beforeEach((): void => {
        angular.mock.module('app');

        angular.mock.inject((_jQuery_) => {
            $ = _jQuery_;
        });

    });

    it('is properly defined', () => {
        expect($).to.not.equal(null);
        expect(typeof $).to.equal('function');
    });

});
