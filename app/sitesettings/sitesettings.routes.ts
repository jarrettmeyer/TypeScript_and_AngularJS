/// <reference path="../../typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app.sitesettings')
        .config([
            '$routeProvider',
            '$locationProvider',
            config]);

    function config($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when('/admin/sitesettings', {
                templateUrl: 'app/sitesettings/sitesettings.html',
                controller: 'app.sitesettings.SiteSettingsController',
                controllerAs: 'vm',
                resolve: {
                    siteSettings: siteSettingsResolve
                }
            });
    }

    siteSettingsResolve.$inject = ['app.services.SiteSettingsService'];
    function siteSettingsResolve(
        siteSettingsService: app.services.ISiteSettingsService): ng.IPromise<app.services.ISiteSettings> {
        return siteSettingsService.getSettings()
            .then((siteSettings: app.services.ISiteSettings): ng.IPromise<app.services.ISiteSettings> => {
                return siteSettingsService.getThemes()
                    .then((themeNames: string[]): app.services.ISiteSettings => {
                        siteSettings.availableThemeNames = themeNames;
                        return siteSettings;
                    });
            });
    }
})();
