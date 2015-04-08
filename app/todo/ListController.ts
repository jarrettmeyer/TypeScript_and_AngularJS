/// <reference path="../../scripts/typings/all.d.ts" />

module app.todo {

    export interface IListScope {
        complete(id: number): void;
        getAll(): app.todo.ITodo[];
    }

    export class ListController implements IListScope {

        $log: ng.ILogService;
        isInitialized: boolean = false;
        todoService: app.services.ITodoService;
        todos: app.todo.ITodo[];

        static $inject = [
            'app.services.TodoService',
            '$log'
        ];
        constructor(todoService: app.services.ITodoService,
                    $log: ng.ILogService) {
            this.todoService = todoService;
            this.$log = $log;
            this.initialize();
        }

        complete(id: number): void {
            this.$log.debug('Completing todo ' + id + '.');
            this.todoService.getById(id)
                .then((result) => {
                    this.$log.debug('Found todo: ', result);
                    result.complete();
                    return this.todoService.save(result);
                });
        }

        getAll(): app.todo.ITodo[] {
            return this.todos;
        }

        initialize(): void {
            this.todoService.getAll()
                .then((result) => {
                    this.todos = result;
                    this.isInitialized = true;
                });
        }

    }

    angular.module('app.todo')
        .controller('app.todo.ListController', ListController);

}
