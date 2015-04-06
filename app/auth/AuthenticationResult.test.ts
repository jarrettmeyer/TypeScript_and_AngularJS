/// <reference path="../../typings/all.d.ts" />

var expect = chai.expect;

describe('AuthenticationResult', () => {

    var user: IUser;
    var result: app.auth.IAuthenticationResult;

    it('assigns the user to the result', () => {
        user = { roles: [], username: '' };
        result = new app.auth.AuthenticationResult(user);
        expect(result.user).to.equal(user);
    });

    it('fails when the user is null', () => {
        user = null;
        result = new app.auth.AuthenticationResult(user);
        expect(result.isSuccessful).to.equal(false);
    });

    it('is successful when the user is not null', () => {
        user = {
            roles: [],
            username: ''
        };
        result = new app.auth.AuthenticationResult(user);
        expect(result.isSuccessful).to.equal(true);
    });

});
