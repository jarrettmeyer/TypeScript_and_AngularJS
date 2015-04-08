/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('LoginController', () => {

    var ctrl: app.auth.ILoginScope;
    var mockAuthenticationService: app.auth.IAuthenticationService;
    var mockCurrentUser: app.ICurrentUser;
    var mockLocalStorage: any;
    var mockLoginModalService: app.auth.ILoginModalService;
    var mockUser: app.auth.IUser;
    var $q: ng.IQService;
    var $rootScope: ng.IRootScopeService;

    beforeEach(() => {
        createUser();
        createAuthenticationService();
        createCurrentUser();
        createLocalStorage();
        createLoginModalService();
        angular.mock.module('app.auth');
        angular.mock.inject([
            '$controller',
            '$q',
            '$rootScope',
            ($controller, _$q, _$rootScope) => {
            ctrl = $controller('app.auth.LoginController', {
                'app.auth.AuthenticationService': mockAuthenticationService,
                'currentUser': mockCurrentUser,
                'localStorage': mockLocalStorage,
                'app.auth.LoginModalService': mockLoginModalService
            });
            ctrl.username = 'john.doe';
            ctrl.password = 'myPassword';
            $q = _$q;
            $rootScope = _$rootScope;
        }]);
    });

    afterEach((): void => {
        localStorage.clear();
    });

    it('can authenticate a username and password', (done) => {
        ctrl.authenticate()
            .then(() => {
                expect(ctrl.isAuthenticated).to.equal(true);
                done();
            });
        $rootScope.$apply();
    });

    it('does not authenticate on authentication failure', (done) => {
        mockUser = null;
        ctrl.authenticate()
            .then(() => {
                expect(ctrl.isAuthenticated).to.equal(false);
                done();
            });
        $rootScope.$apply();
    });

    it('is not authenticated by default', function () {
        expect(ctrl.isAuthenticated).to.equal(false);
    });

    function createAuthenticationService(): void {
        mockAuthenticationService = {
            authenticate(credentials: app.auth.ICredentials): ng.IPromise<app.auth.AuthenticationResult>  {
                if (mockUser) {
                    mockUser.username = credentials.username;
                }
                var result = new app.auth.AuthenticationResult(mockUser);
                var deferred = $q.defer();
                deferred.resolve(result);
                return deferred.promise;
            }
        }
    }

    function createLocalStorage(): void {
        //mockLocalStorage = {
        //    username: '',
        //    roles: [],
        //    reset() { }
        //};
    }

    function createCurrentUser(): void {
        mockCurrentUser = new app.CurrentUser();
    }

    function createLoginModalService(): void {
        mockLoginModalService = {
            isShown: false,
            hide(): void { },
            show(): void { }
        };
    }

    function createUser(): void {
        mockUser = {
            roles: ['admin'],
            username: 'john.doe'
        };
    }

});
