/// <reference path="../scripts/typings/all.d.ts"/>

module app {

    export interface ICurrentUser {
        isAuthenticated: boolean;
        roles: string[];
        username: string;

        isInRole(role: string): boolean;
    }


    export class CurrentUser implements ICurrentUser {
        roles: string[];
        username: string;

        constructor() {
            this.roles = [];
            this.username = null;
        }

        get isAuthenticated(): boolean {
            return !!this.username;
        }

        isInRole(role: string): boolean {
            // indexOf returns -1 if the string is not found.
            return this.roles.indexOf(role) >= 0;
        }
    }

}

