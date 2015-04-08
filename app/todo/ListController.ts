/// <reference path="../../scripts/typings/all.d.ts" />

module app.todo {

    export interface IListScope {
        add(): void;
        complete(id: number): void;
        edit(todo: app.todo.ITodo): void;
        getAllActive(): app.todo.ITodo[];
    }

    export class ListController implements IListScope {

        $log: ng.ILogService;
        $rootScope: ng.IRootScopeService;
        todoModalService: app.todo.ITodoModalService;
        todoService: app.services.ITodoService;
        todos: app.todo.ITodo[];

        static $inject = [
            '$rootScope',
            'app.services.TodoService',
            'app.todo.TodoModalService',
            '$log'
        ];
        constructor($rootScope: ng.IRootScopeService,
                    todoService: app.services.ITodoService,
                    todoModalService: app.todo.ITodoModalService,
                    $log: ng.ILogService) {
            this.$rootScope = $rootScope;
            this.todoService = todoService;
            this.todoModalService = todoModalService;
            this.$log = $log;
            this.initialize();
        }

        add(): void {
            var todo = new app.todo.Todo();
            this.$rootScope.$emit('edit-todo', todo);
            this.todoModalService.show();
        }

        complete(id: number): void {
            this.$log.debug('Completing todo ' + id + '.');
            this.todoService.getById(id)
                .then((result) => {
                    result.complete();
                    return this.todoService.save(result);
                });
        }

        edit(todo: app.todo.ITodo): void {
            this.$log.debug('Editing todo with id', todo.id);
            this.$rootScope.$emit('edit-todo', todo);
            this.todoModalService.show();
        }

        getAllActive(): app.todo.ITodo[] {
            return this.todos;
        }

        initialize(): void {
            this.initializeTodoList();
            this.$rootScope.$on('save-todo', (event: any, data: any) => {
                this.initializeTodoList();
            });
        }

        initializeTodoList(): void {
            this.todoService.getAllActive()
                .then((result) => {
                    this.todos = result;
                });
        }

    }

    angular.module('app.todo')
        .controller('app.todo.ListController', ListController);

}
