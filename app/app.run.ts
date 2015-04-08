/// <reference path="../scripts/typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app')
        .run(run);

    run.$inject = [
        'app.RouteChangeHandler',
        'app.PreviousLoginHandler'
    ];
    function run(routeChangeHandler: app.IRouteChangeHandler,
                 previousLoginHandler: app.IPreviousLoginHandler): void {
        routeChangeHandler.initialize();
        previousLoginHandler.initialize();
    }

})();
