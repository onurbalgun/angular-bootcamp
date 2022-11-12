import { createAction, props } from '@ngrx/store';
import { Catalog } from 'src/app/models/catalog';

export const addCatalogsToCatalogsRegisterModel = createAction(
  '[CatalogsToRegister] Add Catalog To Register Model',
  props<{ catalogsToRegister: Catalog[] }>()
);

export const deleteCatalogs = createAction(
  '[CatalogsToRegister] Delete Catalogs From Register Model'
);
