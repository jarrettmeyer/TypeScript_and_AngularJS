/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILoginScope {
        isAuthenticated: boolean;
        password: string;
        username: string;
        authenticate(): ng.IPromise<void>;
    }

    class LoginController implements ILoginScope {

        password: string;
        username: string;
        private _authenticationService: app.auth.IAuthenticationService;
        private _currentUser: ICurrentUser;
        private _isAuthenticated: boolean;

        static $inject = [
            'app.auth.AuthenticationService',
            'currentUser'
        ];
        constructor(authenticationService: app.auth.IAuthenticationService,
                    currentUser: ICurrentUser) {
            this._authenticationService = authenticationService;
            this._currentUser = currentUser;
            this._isAuthenticated = currentUser.isAuthenticated;
            this.password = null;
            this.username = currentUser.username;
        }

        get isAuthenticated(): boolean {
            return this._isAuthenticated;
        }

        authenticate(): ng.IPromise<void> {
            var credentials: ICredentials = {
                username: this.username,
                password: this.password
            };
            return this._authenticationService.authenticate(credentials)
                .then((result) => {
                    this._isAuthenticated = result.isSuccessful;
                });
        }

    }

    angular
        .module('app.auth')
        .controller('app.auth.LoginController', LoginController);
}
