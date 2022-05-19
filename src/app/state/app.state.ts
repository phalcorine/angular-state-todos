import { CounterState } from "./counter/reducers/counter.reducer";
import { NotificationState } from "./notification/reducers/notification.reducers";
import { TodoState } from "./todos/reducers/todos.reducer";

export interface AppState {
    counter: CounterState;
    todos: TodoState;
    notification: NotificationState;
}