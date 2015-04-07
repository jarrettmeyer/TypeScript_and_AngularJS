/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface IAuthenticationService {
        authenticate(credentials: ICredentials): ng.IPromise<IAuthenticationResult>;
    }

    class AuthenticationService implements IAuthenticationService {

        private $log: ng.ILogService;

        static $inject = ['$log'];
        constructor($log: ng.ILogService) {
            this.$log = $log;
        }

        authenticate(credentials: ICredentials): ng.IPromise<IAuthenticationResult> {
            //
            // Normally, authentication would call upon a web service. However, I am being lazy, and writing a web
            // service is outside the scope of this example. I am simply checking the password in-memory, looking
            // for the phrase 'password' somewhere in the password.
            //
            this.$log.info('Attempting to validate user: ', credentials.username + '.');
            var user: IUser = null;
            if (/password/i.test(credentials.password)) {
                user = AuthenticationService.createUser(credentials);
            }
            return Promise.resolve(new AuthenticationResult(user));
        }

        static createUser(credentials: ICredentials): IUser {
            return {
                roles: ['admin', 'developer'],
                username: credentials.username
            };
        }

    }

    angular
        .module('app.auth')
        .service('app.auth.AuthenticationService', AuthenticationService);

}

