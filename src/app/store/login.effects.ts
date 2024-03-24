import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './login.service';
import { loginAction, loginActionSuccess, loginActionFailure, registerAction, registerActionSuccess, registerActionFailure, addSuggestedEvent, addSuggestedEventSuccess, addSuggestedEventFailure } from './login.actions';
import { SuggestedEventsService } from './suggestedevent.service';
@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private suggestedEventService: SuggestedEventsService,
    ) { }

    login$ = createEffect(() => this.actions$.pipe(
        ofType(loginAction),
        mergeMap((action) => this.authService.login(action.login, action.password)
            .pipe(
                map(user => loginActionSuccess({ user })),
                catchError(error => of(loginActionFailure({ error })))
            ))
    ));

    register$ = createEffect(() => this.actions$.pipe(
        ofType(registerAction),
        mergeMap((action) => this.authService.register(action.name, action.surname, action.login, action.password, action.age, action.phonenumber, action.email)
            .pipe(
                map(user => registerActionSuccess({ user })),
                catchError(error => of(registerActionFailure({ error })))
            ))
    ));

    addSuggestedEvent$ = createEffect(() => this.actions$.pipe(
        ofType(addSuggestedEvent),
        mergeMap((action) => this.suggestedEventService.addSuggestedEvent(action.eventname, action.date, action.location, action.description, action.typeevent, action.deadline, action.photourl)
            .pipe(
                map(suggestedevent => addSuggestedEventSuccess({suggestedevent})),
                catchError(error => of(addSuggestedEventFailure({error})))
            ))
    ));
}
