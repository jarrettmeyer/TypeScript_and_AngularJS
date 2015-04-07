/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('AuthenticationService', (): void => {

    var authService: app.auth.IAuthenticationService;
    var invalidCredentials: app.auth.ICredentials;
    var $rootScope: ng.IRootScopeService;
    var validCredentials: app.auth.ICredentials;

    beforeEach((): void => {
        angular.mock.module('app.auth');
        angular.mock.inject([
            'app.auth.AuthenticationService',
            '$rootScope',
            (_authenticationService, _$rootScope) => {
                authService = _authenticationService;
                $rootScope = _$rootScope;
            }
        ]);

        validCredentials = {
            username: 'john.doe',
            password: 'password!123'
        };
        invalidCredentials = {
            username: 'john.doe',
            password: 'BAD!!!!!'
        }
    });

    it('assigns the username property when successful', () => {
        authService.authenticate(validCredentials)
            .then((result: app.auth.IAuthenticationResult) => {
                expect(result.user.username).to.equal('john.doe');
            });
        $rootScope.$apply();
    });

    it('fails when given the wrong password', () => {
        authService.authenticate(invalidCredentials)
            .then((result) => {
                expect(result.isSuccessful).to.equal(false);
            });
        $rootScope.$apply();
    });

    it('succeeds when given a valid password', () => {
        authService.authenticate(validCredentials)
            .then((result) => {
                expect(result.isSuccessful).to.equal(true);
            });
        $rootScope.$apply();
    });

});
