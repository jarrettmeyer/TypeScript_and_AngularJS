/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;

describe('NavigationController', () => {

    var currentUser: app.ICurrentUser;
    var logoutService: app.auth.ILogoutService;
    var navigationController: app.layout.INavigationScope;

    beforeEach(() => {
        currentUser = new app.CurrentUser();
        logoutService = {
            logout: () => {}
        };
        navigationController = new app.layout.NavigationController(currentUser, logoutService)
    });

    describe('isAuthenticated', () => {

        it('returns false when the username is null', () => {
            currentUser.username = null;
            expect(navigationController.isAuthenticated).to.equal(false);
        });

        it('returns true when username is not null', () => {
            currentUser.username = 'john.doe';
            expect(navigationController.isAuthenticated).to.equal(true);
        });

    });

    describe('username', () => {

        it('returns the current user username', () => {
            currentUser.username = 'my_test_username';
            expect(navigationController.username).to.equal('my_test_username');
        });

    });

    describe('logout()', () => {

        var mock: SinonMock;

        beforeEach((): void => {
            mock = sinon.mock(logoutService);
        });

        it('calls the logout service', () => {
            mock.expects('logout').once();
            navigationController.logout();
            mock.verify();
        });

    });

});
