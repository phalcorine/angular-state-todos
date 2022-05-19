import { createAction, props } from "@ngrx/store";
import { CreateTodoDto, Todo, ToggleTodoCompletionDto, UpdateTodoDto } from "src/app/todos/todo.model";

export const fetchTodos = createAction('[Todos] Fetch Todos');
export const fetchedTodos = createAction('[Todos] Fetched Todos', props<{ items: ReadonlyArray<Todo>}>());
export const addTodo = createAction('[Todos] Add Todo', props<CreateTodoDto>());
export const addedTodo = createAction('[Todos] Added Todo', props<Todo>());
export const toggleTodoCompletion = createAction('[Todos] Toggle Todo Completion', props<ToggleTodoCompletionDto>());
export const updateTodo = createAction('[Todos] Update Todo', props<UpdateTodoDto>());
export const updatedTodo = createAction('[Todos] Updated Todo', props<Todo>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());
export const deletedTodo = createAction('[Todo] Deleted Todo', props<{ id: string }>());