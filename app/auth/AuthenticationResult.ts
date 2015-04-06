/// <reference path="../../typings/all.d.ts" />

module app.auth {

    export interface IAuthenticationResult {
        isSuccessful: boolean;
        user: IUser;
    }

    export class AuthenticationResult implements IAuthenticationResult {
        isSuccessful: boolean;
        user: IUser;

        constructor(user: IUser) {
            this.user = user;
            this.isSuccessful = !!user;
        }
    }
}
