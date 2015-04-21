/// <reference path="../scripts/typings/all.d.ts" />

//
// This handler check local storage for username and roles. If these values
// can be pulled out of local storage, then the user is already authenticated.
// Set these values on the current user object.
//
module app {

    export interface IPreviousLoginHandler {
        initialize(): void;
    }

    export class PreviousLoginHandler implements IPreviousLoginHandler {

        currentUser: app.ICurrentUser;
        localStorage: Storage;

        static $inject = [
            'currentUser',
            'localStorage'
        ];
        constructor(currentUser: app.ICurrentUser,
                    localStorage: Storage) {
            this.currentUser = currentUser;
            this.localStorage = localStorage;
        }

        initialize() {
            this.currentUser.username = this.localStorage.getItem('username');
            this.currentUser.roles = JSON.parse(this.localStorage.getItem('roles')) || [];
        }

    }

    angular.module('app')
        .service('app.PreviousLoginHandler', PreviousLoginHandler);

}
