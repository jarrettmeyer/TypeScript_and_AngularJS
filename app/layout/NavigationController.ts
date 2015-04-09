///<reference path="../../scripts/typings/all.d.ts"/>

module app.layout {
    'use strict';

    export interface INavigationScope {
        isAuthenticated: boolean;
        username: string;
        logout(): void;
    }

    export class NavigationController implements INavigationScope {

        currentUser: ICurrentUser;
        logoutService: app.auth.ILogoutService;

        static $inject = [
            'currentUser',
            'app.auth.LogoutService'
        ];
        constructor(currentUser: ICurrentUser,
                    logoutService: app.auth.ILogoutService) {
            this.currentUser = currentUser;
            this.logoutService = logoutService;
        }

        get isAuthenticated(): boolean {
            return this.currentUser.isAuthenticated;
        }

        get username(): string {
            return this.currentUser.username;
        }

        logout(): void {
            this.logoutService.logout();
        }

    }

    angular
        .module('app.layout')
        .controller('app.layout.NavigationController', NavigationController);
}
