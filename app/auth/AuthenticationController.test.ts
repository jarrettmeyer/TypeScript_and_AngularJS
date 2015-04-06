/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('AuthenticationController', () => {

    var ctrl: app.auth.IAuthenticationScope;
    var mockAuthenticationService: app.auth.IAuthenticationService;
    var mockCurrentUser: ICurrentUser;
    var mockUser: IUser;

    beforeEach(() => {
        createUser();
        createCurrentUser();
        createAuthenticationService();
        angular.mock.module('app.auth');
        angular.mock.inject(($controller) => {
            ctrl = $controller('app.auth.AuthenticationController', {
                'app.auth.AuthenticationService': mockAuthenticationService,
                'currentUser': mockCurrentUser
            });
            ctrl.username = 'john.doe';
            ctrl.password = 'myPassword';
        });
    });

    it('can authenticate a username and password', () => {
        return ctrl.authenticate()
            .then(() => {
                expect(ctrl.isAuthenticated).to.equal(true);
            });
    });

    it('does not authenticate on authentication failure', () => {
        mockUser = null;
        return ctrl.authenticate()
            .then(() => {
                expect(ctrl.isAuthenticated).to.equal(false);
            });
    });

    it('is not authenticated by default', function () {
        expect(ctrl.isAuthenticated).to.equal(false);
    });

    function createAuthenticationService(): void {
        mockAuthenticationService = {
            authenticate(credentials: ICredentials): ng.IPromise<app.auth.AuthenticationResult>  {
                var result = new app.auth.AuthenticationResult(mockUser);
                return Promise.resolve(result);
            }
        }
    }

    function createCurrentUser(): void {
        mockCurrentUser = new app.CurrentUser();
    }

    function createUser(): void {
        mockUser = {
            roles: ['admin'],
            username: 'john.doe'
        };
    }

});
