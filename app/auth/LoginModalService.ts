/// <reference path="../../scripts/typings/all.d.ts"/>

module app.auth {

    export interface ILoginModalService {
        hide(): void;
        show(): void;
    }

    export class LoginModalService implements ILoginModalService {

        element: JQuery;
        jQuery: JQueryStatic;
        selector: string = '#login-modal';

        static $inject = [
            'jQuery'
        ];
        constructor(jQuery: JQueryStatic) {
            this.jQuery = jQuery;
        }

        assertElement(): void {
            if (!this.element) {
                this.element = this.jQuery(this.selector);
            }
        }

        hide(): void {
            this.assertElement();
            this.element.modal('hide');
        }

        show(): void {
            this.assertElement();
            this.element.modal('show');
        }
    }

    angular
        .module('app.auth')
        .service('app.auth.LoginModalService', LoginModalService);

}
