/// <reference path="../../scripts/typings/all.d.ts" />

module app.services {

    export interface ICookieService {
        roles: string[];
        username: string;

        reset(): void;
    }


    export class CookieService implements ICookieService {
        cookieService: any;

        static $inject = ['$cookies'];
        constructor($cookies: angular.cookies.ICookiesService) {
            this.cookieService = $cookies;
        }

        get roles(): string[] {
            var _roles: string = this.cookieService.roles;
            return <string[]>JSON.parse(_roles);
        }

        set roles(value: string[]) {
            this.cookieService.roles = JSON.stringify(value);
        }

        get username(): string {
            return this.cookieService.username;
        }

        set username(value: string) {
            this.cookieService.username = value;
        }

        reset(): void {
            this.roles = null;
            this.username = null;
        }
    }


    angular.module('app.services')
        .service('app.services.CookieService', CookieService);

}
