import { createReducer, on } from '@ngrx/store';
import { User } from './login.interface';
import { loginAction, loginActionSuccess, loginActionFailure } from './login.actions';

export interface LoginState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  loading: false,
  error: null
};

export const loginReducer = createReducer(
  initialState,
  on(loginAction, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loginActionSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
  on(loginActionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
