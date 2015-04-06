///<reference path="../../scripts/typings/all.d.ts"/>

module app.layout {
    'use strict';

    export interface INavigationScope {
        isAuthenticated: boolean;
        username: string;
    }

    export class NavigationController implements INavigationScope {

        private _currentUser: ICurrentUser;

        static $inject = ['currentUser'];
        constructor(currentUser: ICurrentUser) {
            var vm = this;
            vm._currentUser = currentUser;
        }

        get isAuthenticated(): boolean {
            return this._currentUser.isAuthenticated;
        }

        get username(): string {
            return this._currentUser.username;
        }

    }

    angular
        .module('app.layout')
        .controller('app.layout.NavigationController', NavigationController);
}
