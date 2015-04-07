/// <reference path="../scripts/typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app')
        .run(run);

    run.$inject = [
        'app.RouteChangeHandler'
    ];
    function run(routeChangeHandler: app.IRouteChangeHandler): void {
        routeChangeHandler.initialize();
    }

})();
