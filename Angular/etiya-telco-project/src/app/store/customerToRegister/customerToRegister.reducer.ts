import {
  deleteCustomerToRegisterModel,
  setCustomerToRegisterModel,
} from './customerToRegister.actions';
import {
  CustomerToRegisterStoreState,
  initialCustomerToRegisterStoreState,
} from './customerToRegister.state';
import { createReducer, on } from '@ngrx/store';

export const customerToRegisterReducer =
  createReducer<CustomerToRegisterStoreState>(
    initialCustomerToRegisterStoreState,
    on(setCustomerToRegisterModel, (currentState, action) => {
      return {
        ...currentState,
        customerToRegisterModel: action.customerToRegisterModel,
      };
    }),
    on(deleteCustomerToRegisterModel, (currentState) => {
      return {
        ...currentState,
        customerToRegisterModel: null,
      };
    })
  );
