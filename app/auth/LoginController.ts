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
        cookieService: app.services.ICookieService;
        currentUser: ICurrentUser;
        isAuthenticated: boolean;
        loginModalService: app.auth.ILoginModalService;
        password: string;
        username: string;

        static $inject = [
            'app.auth.AuthenticationService',
            'currentUser',
            'app.services.CookieService',
            'app.auth.LoginModalService'
        ];
        constructor(authenticationService: app.auth.IAuthenticationService,
                    currentUser: ICurrentUser,
                    cookieService: app.services.ICookieService,
                    loginModalService: app.auth.ILoginModalService) {
            this.authenticationService = authenticationService;
            this.currentUser = currentUser;
            this.cookieService = cookieService;
            this.loginModalService = loginModalService;
            this.initialize();
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
                        this.updateCurrentUser(result.user);
                        this.updateCookie(result.user);
                    }
                });
        }

        hideDialog(): void {
            this.loginModalService.hide();
        }

        initialize(): void {
            this.password = null;
            this.username = this.currentUser.username;
            this.isAuthenticated = this.currentUser.isAuthenticated;
        }

        updateCookie(user: app.auth.IUser): void {
            this.cookieService.username = user.username;
            this.cookieService.roles = user.roles;
        }

        updateCurrentUser(user: app.auth.IUser): void {
            this.currentUser.username = user.username;
            this.currentUser.roles = user.roles;
        }
    }


    angular
        .module('app.auth')
        .controller('app.auth.LoginController', LoginController);

}
