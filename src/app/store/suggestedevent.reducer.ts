import { createReducer, on } from "@ngrx/store";
import { addSuggestedEvent, addSuggestedEventFailure, addSuggestedEventSuccess } from "./login.actions";
import { SuggestedEvent } from "./login.interface";

export interface SuggestedEventState {
    loading: boolean;
    error: any;
    suggestedevent: SuggestedEvent | null;
}

export const initialState: SuggestedEventState = {
    loading: false,
    error: null,
    suggestedevent: null
}

export const suggestedEventReducer = createReducer(
    initialState,
    on(addSuggestedEvent, state => ({
        ...state,
        loading: true,
        error: null,
    })),

    on(addSuggestedEventSuccess, (state, {suggestedevent}) => ({
        ...state,
        suggestedevent,
        loading: false,
        error: null,
    })),

    on(addSuggestedEventFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error
    }))
)