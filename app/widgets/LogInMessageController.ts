/// <reference path="../../scripts/typings/all.d.ts" />


module app.widgets {

    export interface LoginMessageScope {
        isAuthenticated: boolean;
        isNotAuthenticated: boolean;
    }

    export class LoginMessageController implements LoginMessageScope {

        private _currentUser: ICurrentUser;

        static $inject = [
            'currentUser'
        ];
        constructor(currentUser: ICurrentUser) {
            this._currentUser = currentUser;
        }

        get isAuthenticated(): boolean {
            return this._currentUser.isAuthenticated;
        }

        get isNotAuthenticated(): boolean {
            return !this._currentUser.isAuthenticated;
        }

    }

    angular
        .module('app.widgets')
        .controller('app.widgets.LoginMessageController', LoginMessageController);

}
