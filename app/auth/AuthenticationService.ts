/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface IAuthenticationService {
        authenticate(credentials: ICredentials): ng.IPromise<IAuthenticationResult>;
    }

    export interface ICredentials {
        password: string;
        username: string;
    }

    class AuthenticationService implements IAuthenticationService {

        $log: ng.ILogService;
        $q: ng.IQService;

        static $inject = [
            '$q',
            '$log'
        ];
        constructor($q: ng.IQService,
                    $log: ng.ILogService) {
            this.$q = $q;
            this.$log = $log;
        }

        authenticate(credentials: ICredentials): ng.IPromise<IAuthenticationResult> {
            //
            // Normally, authentication would call upon a web service. However, I am being lazy, and writing a web
            // service is outside the scope of this example. I am simply checking the password in-memory, looking
            // for the phrase 'password' somewhere in the password.
            //
            var deferred = this.$q.defer();
            this.$log.info('Attempting to validate user:', credentials.username + '.');
            var user: IUser = null;
            if (/password/i.test(credentials.password)) {
                user = AuthenticationService.createUser(credentials);
                this.$log.info('Login attempt is successful.');
            } else {
                this.$log.info('Login attempt failed.');
            }
            deferred.resolve(new AuthenticationResult(user));
            return deferred.promise;
        }

        static createUser(credentials: ICredentials): IUser {
            //
            // Creating a user object. This would come from an API in real life.
            //
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

