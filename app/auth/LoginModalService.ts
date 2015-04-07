/// <reference path="../../scripts/typings/all.d.ts"/>

module app.auth {

    export interface ILoginModalService {
        isShown: boolean;
        hide(): void;
        show(): void;
    }

    export class LoginModalService implements ILoginModalService {

        element: JQuery;
        jQuery: JQueryStatic;
        isShown: boolean;
        selector: string = '#login-modal';

        static $inject = [
            'jQuery'
        ];
        constructor(jQuery: JQueryStatic) {
            this.jQuery = jQuery;
            this.isShown = false;
        }

        assertElement(): void {
            if (!this.element) {
                this.element = this.jQuery(this.selector);
            }
        }

        hide(): void {
            this.assertElement();
            this.element.modal('hide');
            this.isShown = false;
        }

        show(): void {
            this.assertElement();
            this.element.modal('show');
            this.isShown = true;
        }
    }

    angular
        .module('app.auth')
        .service('app.auth.LoginModalService', LoginModalService);

}
