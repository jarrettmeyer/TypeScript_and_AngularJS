/// <reference path="../../scripts/typings/all.d.ts" />

var expect = chai.expect;
describe('app.todo.Todo', () => {

    var todo: app.todo.ITodo;
    var tomorrow: string = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    var yesterday: string = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    beforeEach(() => {
        todo = new app.todo.Todo();
    });

    it('completes a todo', () => {
        todo.complete();
        expect(todo.completedAt).to.match(/^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
        expect(todo.isCompleted()).to.equal(true);
    });

    it('sets and gets a description', () => {
        todo.description = 'Hello, world!';
        expect(todo.description).to.equal('Hello, world!');
    });

    describe('isPastDue', () => {

        it('returns false when the todo is not completed and not past due', () => {
            todo.dueAt = tomorrow;
            expect(todo.isPastDue()).to.equal(false);
        });

        it('returns true when the todo is completed after the due date', () => {
            todo.dueAt = yesterday;
            todo.complete();
            expect(todo.isPastDue()).to.equal(true);
        });

        it('returns true when the todo is past due', () => {
            todo.dueAt = yesterday;
            expect(todo.isPastDue()).to.equal(true);
        });

    });

});
