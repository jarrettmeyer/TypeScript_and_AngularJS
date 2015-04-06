/// <reference path="../scripts/typings/all.d.ts" />

((): void => {
    'use strict';

    var currentUser = new app.CurrentUser();

    angular
        .module('app')
        .value('currentUser', currentUser);

})();
