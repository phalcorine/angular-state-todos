import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, EMPTY, first, map, mergeMap } from "rxjs";
import { TodosService } from "src/app/todos/todos.service";
import { AppState } from "../../app.state";
import { NotificationActions } from "../../notification/actions";
import { TodoActions } from "../actions";

@Injectable({
    providedIn: 'root',
})
export class TodosEffects {
    fetchTodos$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.fetchTodos),
        mergeMap(() => this.todosService.getTodos()
            .pipe(
                map(todos => {
                    console.log("Todos fetched from local storage...", todos);
                    return TodoActions.fetchedTodos({ items: todos });
                }),
                catchError(() => EMPTY),
            ),
        ),
    ));

    // persistTodos$ = createEffect(() => this.actions$.pipe(
    //     ofType(TodoActions.persistTodos),
    //     map(payload => {
    //         this.todosService.setTodos(payload.items.slice());
    //         return TodoActions.persistedTodos();
    //     }),
    //     catchError(() => EMPTY),
    // ));

    addTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.addTodo),
        map(payload => {
            const addedTodo = this.todosService.addTodo({ title: payload.title });
            // this.store.dispatch(TodoActions.fetchTodos());
            this.store.dispatch(NotificationActions.show({ message: 'Todo added successfully!' }));
            // return TodoActions.fetchTodos();
            return TodoActions.addedTodo(addedTodo);
        }),
        catchError(() => EMPTY),
        // mergeMap((payload) => this.store.select('todos')
        //     .pipe(
        //         first(),
        //         map((state) => {
        //             console.log('[Todos Effects] About to add todos');
        //             console.log('State:', state);
        //             console.log('Payload:', payload);
        //             const todo = {
        //                 id: Date.now().toString(),
        //                 title: payload.title,
        //                 done: false,
        //             };
        //             const todos: Todo[] = [
        //                 ...state.items,
        //                 todo,
        //             ];
        //             this.store.dispatch(TodoActions.persistTodos({ items: todos }));

        //             return TodoActions.addedTodo(todo);
        //         }),
        //         catchError(() => EMPTY),
        //     ),
        // ),
    ));

    updateTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.updateTodo),
        map((payload) => {
            const updatedTodo = this.todosService.updateTodo(payload);
            this.store.dispatch(NotificationActions.show({ message: 'Todo updated successfully!' }));
            return TodoActions.updatedTodo(updatedTodo);
        }),
        catchError(() => EMPTY),
    ));

    deleteTodo$ = createEffect(() => this.actions$.pipe(
        ofType(TodoActions.deleteTodo),
        map((payload) => {
            const deletedTodoId = this.todosService.deleteTodo(payload.id);
            this.store.dispatch(NotificationActions.show({ message: 'Todo deleted successfully!' }));
            return TodoActions.deletedTodo({ id: deletedTodoId });
        }),
        catchError(() => EMPTY),
    ));

    constructor(
        private readonly actions$: Actions,
        private readonly todosService: TodosService,
        private readonly store: Store<AppState>,
    ) {}
}