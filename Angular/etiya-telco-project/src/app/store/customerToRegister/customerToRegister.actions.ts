import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
import { createAction, props } from '@ngrx/store';

export const setCustomerToRegisterModel = createAction(
  '[CustomerToRegister] Set Customer To Register Model',
  props<{ customerToRegisterModel: CustomerToRegisterModel }>()
);

export const deleteCustomerToRegisterModel = createAction(
  '[CustomerToRegister] Delete Customer To Register Model'
);
