/// <reference path="../../typings/all.d.ts" />

var expect = chai.expect;

describe('AuthenticationController', () => {

    var controller: app.auth.IAuthenticationScope;
    var mockAuthenticationService: app.auth.IAuthenticationService;
    var mockCurrentUser: ICurrentUser;
    var mockUser: IUser;

    beforeEach(() => {
        createUser();
        createCurrentUser();
        createAuthenticationService();
        angular.mock.module('app.auth');
        angular.mock.inject(($controller) => {
            controller = $controller('app.auth.AuthenticationController', {
                'app.auth.AuthenticationService': mockAuthenticationService,
                'currentUser': mockCurrentUser
            });
            controller.username = 'john.doe';
            controller.password = 'myPassword';
        });
    });

    it('can authenticate a username and password', () => {
        return controller.authenticate()
            .then(() => {
                expect(controller.isAuthenticated).to.equal(true);
            });
    });

    it('does not authenticate on authentication failure', () => {
        mockUser = null;
        return controller.authenticate()
            .then(() => {
                expect(controller.isAuthenticated).to.equal(false);
            });
    });

    it('is not authenticated by default', function () {
        expect(controller.isAuthenticated).to.equal(false);
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
        mockCurrentUser = {
            isAuthenticated: false,
            roles: [],
            username: null,
            isInRole(role: string): boolean {
                return false;
            }
        };
    }

    function createUser(): void {
        mockUser = {
            roles: ['admin'],
            username: 'john.doe'
        };
    }

});
