import { createAction, props } from '@ngrx/store';
import { TokenUserModel } from 'src/app/models/tokenUserModel';

export const setTokenUserModel = createAction(
  '[Auth] Set Token User Model',
  props<{ tokenUserModel: TokenUserModel }>()
);

export const deleteTokenUserModel = createAction(
  '[Auth] Delete Token User Model'
);
