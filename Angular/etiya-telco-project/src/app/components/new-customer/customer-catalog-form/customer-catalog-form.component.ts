import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { Catalog } from 'src/app/models/catalog';
import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
import { Service } from 'src/app/models/service';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { AppStoreState } from 'src/app/store/app.state';
import { addCatalogsToCatalogsRegisterModel } from 'src/app/store/catalogsToRegister/catalogsToRegister.actions';

@Component({
  selector: 'app-customer-catalog-form',
  templateUrl: './customer-catalog-form.component.html',
  styleUrls: ['./customer-catalog-form.component.css'],
})
export class CustomerCatalogFormComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  catalogs: Catalog[] = []; //tüm kataloglar veri tabanından çekilip bu değişkene atanacak
  catalogsStore$!: Observable<Catalog[] | null>;
  selectedCatalogs: Catalog[] = [];
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  selectedServices: Service[] = [];
  constructor(
    private catalogsService: CatalogsService,
    private store: Store<AppStoreState>,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.customerToRegisterModel$ = this.store.select((state) => {
      return state.customerToRegister.customerToRegisterModel;
    });

    this.catalogsStore$ = this.store.select(
      (s) => s.catalogsToRegister.catalogsToRegister
    );
  }

  ngOnInit(): void {
    this.catalogsStore$.subscribe((response) => {
      if (response != null) this.selectedCatalogs = response;
    });
    this.subscription = this.customerToRegisterModel$.subscribe(
      (response: any) => {
        if (response.services) {
          const { services } = response;
          this.selectedServices = services;
          return;
        }
      }
    );
    this.getCatalogs(this.selectedServices);
  }
  getCatalogs(services: Service[]) {
    services.forEach((service) => {
      this.catalogsService
        .getCatalogsByServiceId(service.id)
        .subscribe((response) => {
          this.catalogs = this.catalogs.concat(response);
        });
    });
  }
  onCatalogClick(catalog: Catalog) {
    if (this.selectedCatalogs.length >= 2) {
      this.toaster.error('3 den fazla catalog eklenemez lütfen');
      return;
    }
    let removeSelectedCatalog = this.selectedCatalogs.some(
      (selectedCatalog) => {
        return selectedCatalog.id === catalog.id;
      }
    ); //Check if the selected catalog already exists if it exists remove it with filter method and return
    if (removeSelectedCatalog) {
      this.selectedCatalogs = this.selectedCatalogs.filter(
        (selectedCatalog) => {
          return selectedCatalog.id !== catalog.id;
        }
      );
      return;
    }

    this.selectedCatalogs = this.selectedCatalogs.filter((selectedCatalog) => {
      return selectedCatalog.serviceId !== catalog.serviceId;
    });
    this.selectedCatalogs = [...this.selectedCatalogs, catalog];
  }
  toggleCatalogCss(catalog: Catalog) {
    return this.selectedCatalogs.some((selectedCatalog) => {
      return selectedCatalog.id === catalog.id;
    });
  }
  onNext() {
    this.store.dispatch(
      addCatalogsToCatalogsRegisterModel({
        catalogsToRegister: this.selectedCatalogs,
      })
    );
    this.router.navigateByUrl('/homepage/newcustomer/overview');
  }
  onBack() {
    this.store.dispatch(
      addCatalogsToCatalogsRegisterModel({
        catalogsToRegister: this.selectedCatalogs,
      })
    );
    this.router.navigateByUrl('/homepage/newcustomer/services');
  }
  onReset() {
    this.selectedCatalogs = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
