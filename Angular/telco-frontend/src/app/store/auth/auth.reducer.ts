import { createReducer, on } from '@ngrx/store';
import { deleteTokenUserModel, setTokenUserModel } from './auth.actions';
import { AuthStoreState, initialAuthStoreState } from './auth.state';

export const authReducer = createReducer<AuthStoreState>(
  initialAuthStoreState,
  on(setTokenUserModel, (currentState, action) => {
    return {
      ...currentState,
      tokenUserModel: action.tokenUserModel,
    };
  }),
  on(deleteTokenUserModel, (currentState) => {
    return {
      ...currentState,
      tokenUserModel: null,
    };
  })
);
