/// <reference path="../../scripts/typings/all.d.ts" />


module app.todo {

    export interface IListScope {

    }

    export class ListController implements IListScope {

        todoService: app.services.ITodoService;

        static $inject = [
            'app.services.TodoService'
        ];
        constructor(todoService: app.services.ITodoService) {
            this.todoService = todoService;
        }

        getAll(): ng.IPromise<app.todo.ITodo[]> {
            return this.todoService.getAll();
        }
    }

    angular.module('app.todo')
        .controller('app.todo.ListController', ListController);

}
