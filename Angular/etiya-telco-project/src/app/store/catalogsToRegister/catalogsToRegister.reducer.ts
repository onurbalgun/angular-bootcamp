import { createReducer, on } from '@ngrx/store';
import {
  addCatalogsToCatalogsRegisterModel,
  deleteCatalogs,
} from './catalogsToRegister.actions';
import {
  catalogsToRegisterStoreState,
  initialCatalogsToRegisterStoreState,
} from './catalogsToRegister.state';

export const catalogsToRegisterReducer =
  createReducer<catalogsToRegisterStoreState>(
    initialCatalogsToRegisterStoreState,
    on(addCatalogsToCatalogsRegisterModel, (currentState, action) => {
      return { ...currentState, catalogsToRegister: action.catalogsToRegister };
    }),
    on(deleteCatalogs, (currentState) => {
      return {
        ...currentState,
        catalogsToRegister: null,
      };
    })
  );
