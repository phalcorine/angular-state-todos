import { createReducer, on } from "@ngrx/store";
import { Todo } from "src/app/todos/todo.model";
import { TodoActions } from "../actions";

export interface TodoState {
    items: ReadonlyArray<Todo>;
}

export const initialState: TodoState = {
    items: [],
} 

export const todosReducer = createReducer(
    initialState,
    on(TodoActions.fetchTodos, (state) => state),
    on(TodoActions.fetchedTodos, (state, payload) => {
        console.log("[Todos Reducer - Fetched Todos");
        console.log("State:", state);
        console.log("Items:", payload.items);
        return { ...state, items: payload.items };
    }),
    on(TodoActions.addedTodo, (state, payload) => { 
        const newState = {
            ...state,
            items: [
                ...state.items,
                {
                    id: Date.now().toString(),
                    title: payload.title,
                    done: false,
                },
            ]
        };

        // About to add a todo...

        return newState;
    }),
    on(TodoActions.updatedTodo, (state, payload) => {
        return {
            ...state,
            items: state.items.slice().map(entry => {
                if(entry.id === payload.id)
                    return payload;
                return entry;
            }),
        };
    }),
    on(TodoActions.deletedTodo, (state, payload) => {
        return {
            ...state,
            items: state.items.slice().filter(e => e.id !== payload.id),
        };
    }),
    on(TodoActions.toggleTodoCompletion, (state, payload) => {
        return {
            ...state,
            items: [
                ...state.items.slice().map((entry) => {
                    let done = entry.done;
                    if(entry.id === payload.id)
                        done = !entry.done;
                    
                    return {
                        ...entry, done,
                    };
                }),
            ],
        };
    }),
)