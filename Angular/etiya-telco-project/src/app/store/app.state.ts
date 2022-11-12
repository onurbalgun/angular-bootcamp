import { catalogsToRegisterStoreState } from './catalogsToRegister/catalogsToRegister.state';
import { CustomerToRegisterStoreState } from './customerToRegister/customerToRegister.state';

export interface AppStoreState {
  customerToRegister: CustomerToRegisterStoreState;
  catalogsToRegister: catalogsToRegisterStoreState;
}
