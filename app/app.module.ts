/// <reference path="../scripts/typings/all.d.ts" />

((): void => {

    angular.module('app', [
        //
        // Globally required modules.
        //
        'ngRoute',
        //
        // Application modules.
        //
        'app.auth',
        'app.layout',
        'app.services',
        'app.todo',
        'app.welcome',
        'app.widgets'
    ]);

})();
