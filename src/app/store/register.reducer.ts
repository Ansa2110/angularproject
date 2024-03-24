import { createReducer, on } from '@ngrx/store';
import { User } from './login.interface';
import { registerAction, registerActionSuccess, registerActionFailure } from './login.actions';

export interface RegisterState {
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  user: null
};

export const registerReducer = createReducer(
  initialState,
  on(registerAction, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(registerActionSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(registerActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
