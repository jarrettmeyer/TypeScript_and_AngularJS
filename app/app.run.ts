/// <reference path="../typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app')
        .run(run);

    run.$inject = [
        '$rootScope',
        '$cookies',
        'currentUser'
    ];
    function run($rootScope: ng.IRootScopeService,
                 $cookies: IAppCookies,
                 currentUser: ICurrentUser): void {
        $rootScope.$on('$routeChangeError', (): void => {

        });
        currentUser.roles = $cookies.roles;
        currentUser.username = $cookies.username;
    }

})();
