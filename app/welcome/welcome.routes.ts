/// <reference path="../../scripts/typings/all.d.ts"/>

((): void => {

    angular.module('app.welcome').config(config);

    config.$inject = [
        '$routeProvider'
    ];
    function config($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when('/', {
                templateUrl: 'app/welcome/welcome.html',
                controller: 'app.welcome.WelcomeController'
            });
    }

})();
