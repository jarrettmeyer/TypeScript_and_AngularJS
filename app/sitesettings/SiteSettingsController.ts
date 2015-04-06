/// <reference path="../../typings/all.d.ts" />

module app.sitesettings {
    'use strict';

    interface ISiteSettingsScope {
        description: string;
        title: string;

        save(): void;
    }

    class SiteSettingsController implements ISiteSettingsScope {

        description: string;
        title: string;
        private _storage : Storage;

        static $inject = ['$window'];
        constructor($window: ng.IWindowService) {
            var vm = this;
            vm.title = '';
            vm.description = '';
            vm._storage = $window.localStorage;
        }

        save(): void {
            this._storage.setItem('description', this.description);
            this._storage.setItem('title', this.title);
        }
    }

    angular
        .module('app.sitesettings')
        .controller('app.sitesettings.SiteSettingsController', SiteSettingsController);
}
