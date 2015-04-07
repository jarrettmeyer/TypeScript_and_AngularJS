/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILoginScope {
        isAuthenticated: boolean;
        password: string;
        username: string;
        authenticate(): ng.IPromise<void>;
        hideDialog(): void;
    }

    class LoginController implements ILoginScope {

        authenticationService: app.auth.IAuthenticationService;
        currentUser: ICurrentUser;
        isAuthenticated: boolean;
        loginModalService: app.auth.ILoginModalService;
        password: string;
        username: string;

        static $inject = [
            'app.auth.AuthenticationService',
            'currentUser',
            'app.auth.LoginModalService'
        ];
        constructor(authenticationService: app.auth.IAuthenticationService,
                    currentUser: ICurrentUser,
                    loginModalService: app.auth.ILoginModalService) {
            this.authenticationService = authenticationService;
            this.currentUser = currentUser;
            this.loginModalService = loginModalService;
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

        hideDialog(): void {
            this.loginModalService.hide();
        }

    }

    angular
        .module('app.auth')
        .controller('app.auth.LoginController', LoginController);
}
