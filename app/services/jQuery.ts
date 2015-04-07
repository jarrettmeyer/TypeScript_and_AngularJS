/// <reference path="../../scripts/typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app')
        .factory('jQuery', factory);

    function factory($window: ng.IWindowService): JQueryStatic {
        var jQuery = $window['jQuery'];
        if (!jQuery) {
            throw new Error('jQuery is not defined.');
        } else {
            return <JQueryStatic>jQuery;
        }
    }

})();
