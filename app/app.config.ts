/// <reference path="../scripts/typings/all.d.ts" />

((): void => {
    "use strict";

    angular
        .module('app')
        .config(config);

    config.$inject = [
        '$locationProvider'
    ];
    function config($locationProvider: ng.ILocationProvider): void {
        //
        // Setup hash-links.
        //
        $locationProvider.html5Mode(true);
    }

})();
