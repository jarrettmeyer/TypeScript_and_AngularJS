/// <reference path="../../scripts/typings/all.d.ts" />

module app.auth {

    export interface IAuthenticationResult {
        isSuccessful: boolean;
        user: IUser;
    }

    export interface IUser {
        roles: string[];
        username: string;
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
