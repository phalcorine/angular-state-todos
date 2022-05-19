import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { CreateTodoDto, Todo, UpdateTodoDto } from "./todo.model";

const STORAGE_KEY_TODOS = 'todos';

@Injectable({
    providedIn: 'root',
})
export class TodosService {
    constructor() {}

    getTodos(): Observable<Todo[]> {
        return of(this._getTodos());
    }

    addTodo(payload: CreateTodoDto): Todo {
        // Fetch existing todos...
        const existingTodos = this._getTodos();

        // Create a new todo object
        const newTodo: Todo = {
            id: Date.now().toString(),
            title: payload.title,
            done: false,
        };

        // Update list of todos...
        const newTodos: Todo[] = [
            ...existingTodos, 
            newTodo,
        ];

        // Persist data...
        this._setTodos(newTodos);

        return newTodo;
    }

    updateTodo(payload: UpdateTodoDto): Todo {
        // Fetch existing todos...
        const existingTodos = this._getTodos();

        // Find todo to be updated...
        const exisitingTodo = existingTodos.find(e => e.id === payload.id);
        if(!exisitingTodo) {
            throw Error(`A todo with the specified ID: ${payload.id} was not found!`);
        }

        // Update todo record...
        const updatedTodo: Todo = {
            ...exisitingTodo,
            title: payload.title,
        };

        // Update list of todos...
        const newTodos = existingTodos.slice().map(entry => {
            if(entry.id === payload.id)
                return updatedTodo;
            return entry;
        });

        // Persist data...
        this._setTodos(newTodos);

        return updatedTodo;
    }

    deleteTodo(id: string): string {
        // Fetch existing todos
        const exisitingTodos = this._getTodos();

        // Filter out todo to be deleted...
        const newTodos = exisitingTodos.slice().filter(e => e.id !== id);

        // Persist data...
        this._setTodos(newTodos);

        return id;
    }

    private _getTodos(): Todo[] {
        const payload = localStorage.getItem(STORAGE_KEY_TODOS) || "[]";
        const todos = JSON.parse(payload) as Todo[];

        return todos;
    }

    private _setTodos(todos: Todo[]) {
        localStorage.setItem(STORAGE_KEY_TODOS, JSON.stringify(todos));
    }
}