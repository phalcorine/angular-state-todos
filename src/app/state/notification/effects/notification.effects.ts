import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { NotificationActions } from "../actions";

@Injectable({
    providedIn: 'root',
})
export class NotificationEffects {

    show$ = createEffect(() => this.actions$.pipe(
        ofType(NotificationActions.show),
        map(payload => {
            alert('[Message] ' + payload.message);

            return NotificationActions.shown();
        }),
    ));

    constructor(
        private actions$: Actions,
    ) {}
}