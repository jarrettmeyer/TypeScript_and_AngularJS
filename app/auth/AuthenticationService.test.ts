/// <reference path="../../typings/all.d.ts" />

var expect = chai.expect;

describe('AuthenticationService', (): void => {

    var invalidCredentials, svc, validCredentials;

    beforeEach(() => {
        angular.mock.module('app.auth');
        angular.mock.inject([
            'app.auth.AuthenticationService',
            (authenticationService) => {
                svc = authenticationService;
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
        return svc.authenticate(validCredentials)
            .then((result) => {
                expect(result.user.username).to.equal('john.doe');
            });
    });

    it('fails when given the wrong password', () => {
        return svc.authenticate(invalidCredentials)
            .then((result) => {
                expect(result.isSuccessful).to.equal(false);
            });
    });

    it('succeeds when given a valid password', () => {
        return svc.authenticate(validCredentials)
            .then((result) => {
                expect(result.isSuccessful).to.equal(true);
            });
    });

});
