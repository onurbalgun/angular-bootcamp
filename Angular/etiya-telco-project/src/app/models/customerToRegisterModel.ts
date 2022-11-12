import { CorporateCustomer } from './corporateCustomer';
import { IndividualCustomer } from './individualCustomer';
export interface CustomerToRegisterModel {
  customer: IndividualCustomer | CorporateCustomer | null;
}
