/// <reference path="../../typings/all.d.ts" />

((): void => {
    'use strict';

    angular
        .module('app.blocks')
        .config(config);

    config.$inject = ['$provide'];
    function config($provide: ng.auto.IProvideService): void {
        $provide.decorator('$log', addTimestampToLog);
    }

    addTimestampToLog.$inject = ['$delegate'];
    function addTimestampToLog($delegate: any) : ng.ILogService {
        var debugFn = $delegate.debug;
        $delegate.debug = (...args: any[]): void => {
            var now = (new Date()).toLocaleTimeString();
            args[0] = now + ' - ' + args[0];
            debugFn.apply(null, args);
        };
        return $delegate;
    }

})();
