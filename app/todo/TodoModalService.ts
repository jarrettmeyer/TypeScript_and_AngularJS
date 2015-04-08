/// <reference path="../../scripts/typings/all.d.ts"/>

module app.todo {

    export interface ITodoModalService {
        hide(): void;
        show(): void;
    }

    export class TodoModalService implements ITodoModalService {

        $log: ng.ILogService;
        element: JQuery;
        jQuery: JQueryStatic;
        selector: string = '#todo-modal';

        static $inject = [
            'jQuery',
            '$log'
        ];
        constructor(jQuery: JQueryStatic, $log: ng.ILogService) {
            this.jQuery = jQuery;
            this.$log = $log;
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
        .module('app.todo')
        .service('app.todo.TodoModalService', TodoModalService);

}
