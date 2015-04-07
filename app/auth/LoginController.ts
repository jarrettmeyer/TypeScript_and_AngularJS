/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILoginScope {
        isAuthenticated: boolean;
        password: string;
        username: string;
        authenticate(): ng.IPromise<void>;
    }

    class LoginController implements ILoginScope {

        $scope: ng.IScope;
        isAuthenticated: boolean;
        password: string;
        username: string;
        authenticationService: app.auth.IAuthenticationService;
        currentUser: ICurrentUser;

        static $inject = [
            'app.auth.AuthenticationService',
            'currentUser'
        ];
        constructor(authenticationService: app.auth.IAuthenticationService,
                    currentUser: ICurrentUser) {
            this.authenticationService = authenticationService;
            this.currentUser = currentUser;
            this.isAuthenticated = currentUser.isAuthenticated;
            this.password = null;
            this.username = currentUser.username;
        }

        get isNotAuthenticated(): boolean {
            return !this.isAuthenticated;
        }

        authenticate(): ng.IPromise<void> {
            var credentials: ICredentials = {
                username: this.username,
                password: this.password
            };
            return this.authenticationService.authenticate(credentials)
                .then((result) => {
                    if (result.isSuccessful) {
                        this.isAuthenticated = true;
                        this.currentUser.username = result.user.username;
                        this.currentUser.roles = result.user.roles;
                    }
                });
        }

    }

    angular
        .module('app.auth')
        .controller('app.auth.LoginController', LoginController);
}
