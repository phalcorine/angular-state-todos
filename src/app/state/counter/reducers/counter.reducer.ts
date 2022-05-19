import { createReducer, on } from "@ngrx/store";
import { CounterActions } from "../actions";

export interface CounterState {
    count: number;
}

export const initialState: CounterState = {
    count: 0, 
}

export const counterReducer = createReducer(
    initialState,
    on(CounterActions.increment, (state) => ({ ...state, count: state.count + 1 })),
    on(CounterActions.decrement, (state) => ({ ...state, count: state.count - 1 })),
    on(CounterActions.reset, (state) => ({ ...state, count: initialState.count }))
)