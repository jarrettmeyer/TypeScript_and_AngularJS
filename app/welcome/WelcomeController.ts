/// <reference path="../../scripts/typings/all.d.ts" />

module app.welcome {

    export interface WelcomeScope {
        timestamp: string;
    }

    export class WelcomeController implements WelcomeScope {
        get timestamp(): string {
            return (new Date()).toISOString();
        }
    }

    angular.module('app.welcome').controller('app.welcome.WelcomeController', WelcomeController);

}
