/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILogoutService {
        logout(): void;
    }

    export class LogoutService implements ILogoutService {

        $rootScope: ng.IRootScopeService;
        currentUser: app.ICurrentUser;
        localStorage: Storage;

        static $inject = ['currentUser', 'localStorage', '$rootScope'];
        constructor(currentUser: app.ICurrentUser,
                    localStorage: Storage,
                    $rootScope: ng.IRootScopeService) {
            this.currentUser = currentUser;
            this.localStorage = localStorage;
            this.$rootScope = $rootScope;
        }

        logout(): void {
            this.currentUser.username = null;
            this.currentUser.roles = [];
            this.localStorage.removeItem('username');
            this.localStorage.removeItem('roles');
            this.$rootScope.$emit('logout');
        }

    }

    angular.module('app.auth')
        .service('app.auth.LogoutService', LogoutService);

}
