///<reference path="../../typings/all.d.ts"/>

module app.layout {
    'use strict';

    interface INavigationScope {
        fullName: string;
    }

    class NavigationController implements INavigationScope {

        fullName: string;

        static $inject = ['currentUser'];
        constructor(currentUser: ICurrentUser) {
            var vm = this;
            vm.fullName = currentUser.fullName;
        }

    }

    angular
        .module('app.layout')
        .controller('app.layout.NavigationController', NavigationController);
}
