import { createAction, props } from "@ngrx/store";
import { User, SuggestedEvent } from "./login.interface";

export const loginAction = createAction('[Login] User Login', props<{login: string, password:string}>());

export const loginActionSuccess = createAction('[Login] Login Success', props<{user:User | null}>())

export const loginActionFailure = createAction('[Login] Login Failure', props<{error:string}>())

export const registerAction = createAction('[Register] Register User', props<{name:string, surname:string, login:string, password:string, age:string, phonenumber:string, email: string;}>())

export const registerActionSuccess = createAction('[Register] Register User Success', props<{user: User | null}>())

export const registerActionFailure = createAction('[Register] Register User Failure', props<{error:any}>())

export const addSuggestedEvent = createAction('[Suggested Event] Add Suggested Event', props<{eventname: string, date: Date, location: string, description: string, typeevent: string, deadline: Date, photourl: string}>())

export const addSuggestedEventSuccess = createAction('[Suggested Event] Add Suggested Event Success', props<{suggestedevent: SuggestedEvent | null}>())

export const addSuggestedEventFailure = createAction('[Suggested Event] Add Suggested Event Failure', props<{error: any}>())