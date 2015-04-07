/// <reference path="../../scripts/typings/all.d.ts"/>

((): void => {

    angular.module('app.todo').config(config);

    config.$inject = [
        '$routeProvider'
    ];
    function config($routeProvider: ng.route.IRouteProvider): void {
        $routeProvider
            .when('/todo', {
                templateUrl: 'app/todo/list.html',
                controller: 'app.todo.ListController'
            });
    }

})();
