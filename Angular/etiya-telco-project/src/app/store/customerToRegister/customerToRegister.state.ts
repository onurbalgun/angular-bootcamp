import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';

export interface CustomerToRegisterStoreState {
  customerToRegisterModel: CustomerToRegisterModel | null;
}

export const initialCustomerToRegisterStoreState: CustomerToRegisterStoreState =
  {
    customerToRegisterModel: null,
  };
