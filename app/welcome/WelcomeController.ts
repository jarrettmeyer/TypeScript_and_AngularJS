/// <reference path="../../scripts/typings/all.d.ts" />

module app.welcome {

    export interface WelcomeScope {

    }

    export class WelcomeController implements WelcomeScope {

    }

    angular.module('app.welcome').controller('app.welcome.WelcomeController', WelcomeController);

}
