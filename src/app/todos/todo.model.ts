export interface Todo {
    id: string;
    title: string;
    done: boolean;
}

export interface CreateTodoDto {
    title: string;
}

export interface UpdateTodoDto {
    id: string;
    title: string;
}

export interface ToggleTodoCompletionDto {
    id: string;
}