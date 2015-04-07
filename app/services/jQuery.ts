/// <reference path="../../scripts/typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app')
        .factory('jQuery', factory);

    function factory($window: ng.IWindowService): JQuery {
        var $ = $window['jQuery'];
        if (!$) {
            throw new Error('jQuery is not defined');
        } else {
            return <JQuery>$;
        }
    }

})();
