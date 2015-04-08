/// <reference path="../../scripts/typings/all.d.ts" />

module app.todo {

    export interface ITodo {
        completedAt: string;
        description: string;
        dueAt: string;
        id: number;

        complete(): void;
        isActive(): boolean;
        isCompleted(): boolean;
        isPastDue(): boolean;
    }

    export class Todo implements ITodo {
        completedAt: string;
        description: string;
        dueAt: string;
        id: number;

        complete(): void {
            this.completedAt = (new Date()).toISOString();
        }

        isActive(): boolean {
            return !this.completedAt;
        }

        isCompleted(): boolean {
            return !!this.completedAt;
        }

        isPastDue(): boolean {
            // If no dueAt, then impossible to be past due.
            if (!this.dueAt) {
                return false;
            }
            if (this.completedAt) {
                return new Date(this.completedAt) > new Date(this.dueAt);
            }
            return new Date() > new Date(this.dueAt);
        }
    }

}
