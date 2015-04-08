/// <reference path="../../scripts/typings/all.d.ts" />

module app.services {

    export interface ITodoService {
        /**
         * Deletes all todos.
         */
        clear(): void;
        getAll(): ng.IPromise<app.todo.ITodo[]>;
        save(todo: app.todo.ITodo): ng.IPromise<app.todo.ITodo>;
    }

    export class TodoService implements ITodoService {

        $q: ng.IQService;
        localStorage: Storage;
        maxId: number = 0;
        todos: app.todo.ITodo[];

        static $inject = [
            'localStorage',
            '$q'
        ];
        constructor(localStorage: Storage,
                    $q: ng.IQService) {
            this.localStorage = localStorage;
            this.$q = $q;
            this.initialize();
        }

        get nextId(): number {
            return this.maxId + 1;
        }

        clear(): void {
            this.todos = [];
            this.maxId = 0;
            this.localStorage.removeItem('todos');
        }

        commit(): void {
            this.localStorage.setItem('todos', JSON.stringify(this.todos));
        }

        create(todo: app.todo.ITodo): ng.IPromise<app.todo.ITodo> {
            var deferred = this.$q.defer();
            todo.id = this.nextId;
            this.incrementId();
            this.todos.push(todo);
            this.commit();
            deferred.resolve(todo);
            return deferred.promise;
        }

        getAll(): ng.IPromise<app.todo.ITodo[]> {
            var deferred = this.$q.defer();
            deferred.resolve(this.todos);
            return deferred.promise;
        }

        getIndex(todo: app.todo.ITodo): number {
            for (var i = 0; i < this.todos.length; i += 1) {
                if (this.todos[i].id === todo.id) {
                    return i;
                }
            }
            return -1;
        }

        incrementId(): void {
            this.maxId += 1;
        }

        initialize(): void {
            this.todos = this.localStorage.getItem('todos') || [];
        }

        save(todo: app.todo.ITodo): ng.IPromise<app.todo.ITodo> {
            if (todo.id) {
                return this.update(todo);
            } else {
                return this.create(todo);
            }
        }

        remove(todo: app.todo.ITodo): ng.IPromise<boolean> {
            var deferred = this.$q.defer();
            var index = this.getIndex(todo);
            if (index < 0) {
                throw new Error('Unable to find existing todo with id: ' + todo.id + '.');
            }
            this.todos.splice(index, 1);
            this.commit();
            deferred.resolve(true);
            return deferred.promise;
        }

        update(todo: app.todo.ITodo): ng.IPromise<app.todo.ITodo> {
            var index = this.getIndex(todo);
            if (index < 0) {
                throw new Error('Unable to find existing todo with id: ' + todo.id + '.');
            }
            this.todos[index] = todo;
            this.commit();
            return null;
        }

    }


    angular.module('app.services')
        .service('app.services.TodoService', TodoService);

}
