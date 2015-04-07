/// <reference path="../../scripts/typings/all.d.ts" />


module app.todo {

    export interface IListScope {

    }

    export class ListController implements IListScope {

    }

    angular.module('app.todo')
        .controller('app.todo.ListController', ListController);

}
