/// <reference path="../../scripts/typings/all.d.ts" />

((): void => {

    factory.$inject = ['$window'];
    function factory($window: ng.IWindowService): Storage {
        var storage: Storage;
        storage = $window.localStorage;
        return storage;
    }

    angular.module('app')
        .factory('localStorage', factory)

})();
