import { createAction, props } from "@ngrx/store";

export const show = createAction('[Notification] Show Notification', props<{ message: string }>());
export const shown = createAction('[Notification] Shown Notification');