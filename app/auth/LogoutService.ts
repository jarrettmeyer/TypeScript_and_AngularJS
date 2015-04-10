/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILogoutService {
        logout(): void;
    }

    export class LogoutService implements ILogoutService {

        $location: ng.ILocationService;
        $rootScope: ng.IRootScopeService;
        currentUser: app.ICurrentUser;
        localStorage: Storage;

        static $inject = ['currentUser', 'localStorage', '$rootScope', '$location'];
        constructor(currentUser: app.ICurrentUser,
                    localStorage: Storage,
                    $rootScope: ng.IRootScopeService,
                    $location: ng.ILocationService) {
            this.currentUser = currentUser;
            this.localStorage = localStorage;
            this.$rootScope = $rootScope;
            this.$location = $location;
        }

        logout(): void {
            this.currentUser.username = null;
            this.currentUser.roles = [];
            this.localStorage.removeItem('username');
            this.localStorage.removeItem('roles');
            this.$rootScope.$emit('logout');
            this.$location.path('/');
        }

    }

    angular.module('app.auth')
        .service('app.auth.LogoutService', LogoutService);

}
