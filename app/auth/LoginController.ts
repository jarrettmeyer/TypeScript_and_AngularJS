/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface ILoginScope {
        isAuthenticated: boolean;
        password: string;
        username: string;
        authenticate(): ng.IPromise<void>;
        hideDialog(): void;
        isFooterVisible(): boolean;
        isLoginFormVisible(): boolean;
        isSuccessAlertVisible(): boolean;
    }

    export class LoginController implements ILoginScope {

        $rootScope: ng.IRootScopeService;
        authenticationService: app.auth.IAuthenticationService;
        currentUser: ICurrentUser;
        isAuthenticated: boolean;
        localStorage: Storage;
        loginModalService: app.auth.ILoginModalService;
        password: string;
        username: string;

        static $inject = [
            'app.auth.AuthenticationService',
            'currentUser',
            'localStorage',
            'app.auth.LoginModalService',
            '$rootScope'
        ];
        constructor(authenticationService: app.auth.IAuthenticationService,
                    currentUser: ICurrentUser,
                    localStorage: Storage,
                    loginModalService: app.auth.ILoginModalService,
                    $rootScope: ng.IRootScopeService) {
            this.authenticationService = authenticationService;
            this.currentUser = currentUser;
            this.localStorage = localStorage;
            this.loginModalService = loginModalService;
            this.$rootScope = $rootScope;
            this.initialize();
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
                        this.updateLocalStorage(result.user);
                    }
                });
        }

        bindEvents(): void {
            this.$rootScope.$on('logout', () => {
                this.username = '';
                this.password = '';
                this.isAuthenticated = false;
            });
        }

        hideDialog(): void {
            this.loginModalService.hide();
        }

        initialize(): void {
            this.password = null;
            this.username = this.currentUser.username;
            this.isAuthenticated = this.currentUser.isAuthenticated;
            this.bindEvents();
        }

        isFooterVisible(): boolean {
            return !this.isAuthenticated;
        }

        isLoginFormVisible(): boolean {
            return !this.isAuthenticated;
        }

        isSuccessAlertVisible(): boolean {
            return this.isAuthenticated;
        }

        updateCurrentUser(user: app.auth.IUser): void {
            this.currentUser.username = user.username;
            this.currentUser.roles = user.roles;
        }

        updateLocalStorage(user: app.auth.IUser): void {
            this.localStorage.setItem('username', user.username);
            this.localStorage.setItem('roles', JSON.stringify(user.roles));
        }
    }


    angular
        .module('app.auth')
        .controller('app.auth.LoginController', LoginController);

}
