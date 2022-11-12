import { Catalog } from 'src/app/models/catalog';

export interface catalogsToRegisterStoreState {
  catalogsToRegister: Catalog[] | null;
}

export const initialCatalogsToRegisterStoreState: catalogsToRegisterStoreState =
  {
    catalogsToRegister: null,
  };
