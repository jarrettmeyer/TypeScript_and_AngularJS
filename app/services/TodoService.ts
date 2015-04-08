/// <reference path="../../scripts/typings/all.d.ts" />

module app.services {

    export interface ITodoService {
        clear(): void;
        getAll(): ng.IPromise<app.todo.ITodo[]>;
        getById(id: number): ng.IPromise<app.todo.ITodo>;
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

        getById(id: number): ng.IPromise<app.todo.ITodo> {
            var deferred = this.$q.defer();
            var index = this.getIndexOfId(id);
            deferred.resolve(this.todos[index]);
            return deferred.promise;
        }

        getIndexOfId(id: number): number {
            for (var i = 0; i < this.todos.length; i += 1) {
                if (this.todos[i].id === id) {
                    return i;
                }
            }
            return -1;
        }

        incrementId(): void {
            this.maxId += 1;
        }

        initialize(): void {
            this.todos = [];
            var todos = JSON.parse(this.localStorage.getItem('todos') || '[]');
            for (var i = 0; i < todos.length; i += 1) {
                var todo = new app.todo.Todo();
                todo.id = todos[i].id;
                todo.description = todos[i].description;
                todo.dueAt = todos[i].dueAt;
                todo.completedAt = todos[i].completeAt;
                if (todos[i].id > this.maxId) {
                    this.maxId = todos[i].id;
                }
                this.todos.push(todo);
            }
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
            var index = this.getIndexOfId(todo.id);
            if (index < 0) {
                throw new Error('Unable to find existing todo with id: ' + todo.id + '.');
            }
            this.todos.splice(index, 1);
            this.commit();
            deferred.resolve(true);
            return deferred.promise;
        }

        update(todo: app.todo.ITodo): ng.IPromise<app.todo.ITodo> {
            var deferred = this.$q.defer();
            var index = this.getIndexOfId(todo.id);
            if (index < 0) {
                throw new Error('Unable to find existing todo with id: ' + todo.id + '.');
            }
            this.todos[index] = todo;
            deferred.resolve(todo);
            this.commit();
            return deferred.promise;
        }

    }


    angular.module('app.services')
        .service('app.services.TodoService', TodoService);

}
