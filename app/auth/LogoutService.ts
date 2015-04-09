/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILogoutService {
        logout(): void;
    }

    export class LogoutService implements ILogoutService {

        currentUser: app.ICurrentUser;
        localStorage: Storage;

        static $inject = ['currentUser', 'localStorage'];
        constructor(currentUser: app.ICurrentUser,
                    localStorage: Storage) {
            this.currentUser = currentUser;
            this.localStorage = localStorage;
        }

        logout(): void {
            this.currentUser.username = null;
            this.currentUser.roles = [];
            this.localStorage.removeItem('username');
            this.localStorage.removeItem('roles');
        }

    }

    angular.module('app.auth')
        .service('app.auth.LogoutService', LogoutService);

}
