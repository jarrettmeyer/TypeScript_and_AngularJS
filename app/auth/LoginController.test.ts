/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('LoginController', () => {

    var authenticationService: any;
    var currentUser: any;
    var localStorage: any;
    var loginController: app.auth.ILoginScope;
    var loginModalService: any;
    var $q: ng.IQService;
    var $rootScope: ng.IRootScopeService;

    beforeEach(() => {
        authenticationService = {
            authenticate: () => {}
        };
        currentUser = {
            isAuthenticated: false
        };
        localStorage = {};
        loginModalService = {};
        angular.mock.module('app.auth');
        angular.mock.inject([
            '$controller',
            '$rootScope',
            '$q',
            (_$controller, _$rootScope, _$q) => {
                loginController = _$controller(
                    'app.auth.LoginController',
                    {
                        'app.auth.AuthenticationService': authenticationService,
                        'currentUser': currentUser,
                        'localStorage': localStorage,
                        'app.auth.LoginModalService': loginModalService
                    }
                );
                $rootScope = _$rootScope;
                $q = _$q;
            }
        ]);
    });

    afterEach((): void => {
    });

    it('is not authenticated by default', () => {
        expect(loginController.isAuthenticated).to.equal(false);
    });

    describe('authenticate (success)', () => {

        beforeEach(() => {
            setupAuthentication();
        });

        it('calls the authentication service with the expected credentials', (done) => {
            var spy = sinon.spy(authenticationService, 'authenticate');
            loginController.username = 'hello';
            loginController.password = 'world';
            var expectedCredentials = {
                username: 'hello',
                password: 'world'
            };
            loginController.authenticate()
                .then(() => {
                    expect(spy.calledWith(expectedCredentials)).to.equal(true);
                    done();
                });
            $rootScope.$apply();
        });

        it('can authenticate a username and password', (done) => {
            loginController.authenticate()
                .then(() => {
                    expect(loginController.isAuthenticated).to.equal(true);
                    done();
                });
            $rootScope.$apply();
        });

        it('sets the roles in local storage', (done) => {
            var spy = sinon.spy(localStorage, 'setItem');
            loginController.authenticate()
                .then(() => {
                    expect(spy.calledWith('roles')).to.equal(true);
                    done();
                });
            $rootScope.$apply();
        });

        it('sets the username in local storage', (done) => {
            var spy = sinon.spy(localStorage, 'setItem');
            loginController.authenticate()
                .then(() => {
                    expect(spy.calledWith('username')).to.equal(true);
                    done();
                });
            $rootScope.$apply();
        });

    });

    function setupAuthentication() {
        authenticationService.authenticate = () => {
            var deferred = $q.defer();
            deferred.resolve({
                isSuccessful: true,
                user: {
                    username: 'john.doe',
                    roles: ['admin', 'tester']
                }
            });
            return deferred.promise;
        };
        localStorage.setItem = () => { };
    }

});
