/// <reference path="../scripts/typings/all.d.ts" />

((): void => {

    angular.module('app', [
        //
        // Globally required modules.
        //
        'ngCookies',
        'ngRoute',
        //
        // Application modules.
        //
        'app.auth',
        'app.layout',
        'app.todo',
        'app.welcome',
        'app.widgets'
    ]);

})();
