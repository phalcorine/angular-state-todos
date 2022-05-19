import { createReducer, on } from "@ngrx/store";
import { NotificationActions } from "../actions";

export interface NotificationState {
    message: string | null;
}

export const initialState: NotificationState = {
    message: null,
}

export const notificationReducer = createReducer(
    initialState,
    on(NotificationActions.shown, (state) => {
        return { ...state, message: null }
    }),
);