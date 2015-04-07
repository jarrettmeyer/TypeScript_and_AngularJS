/// <reference path="../../scripts/typings/all.d.ts" />


module app.widgets {

    export interface LoginMessageScope {
        isAuthenticated: boolean;
        isNotAuthenticated: boolean;
        showDialog(): void;
    }

    export class LoginMessageController implements LoginMessageScope {

        currentUser: ICurrentUser;
        loginModalService: app.auth.ILoginModalService;

        static $inject = [
            'currentUser',
            'app.auth.LoginModalService'
        ];
        constructor(currentUser: ICurrentUser,
                    loginModalService: app.auth.ILoginModalService) {
            this.currentUser = currentUser;
            this.loginModalService = loginModalService;
        }

        get isAuthenticated(): boolean {
            return this.currentUser.isAuthenticated;
        }

        get isNotAuthenticated(): boolean {
            return !this.currentUser.isAuthenticated;
        }

        showDialog(): void {
            this.loginModalService.show();
        }

    }

    angular
        .module('app.widgets')
        .controller('app.widgets.LoginMessageController', LoginMessageController);

}
