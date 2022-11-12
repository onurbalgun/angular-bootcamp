import { ServicesService } from './../../../services/services.service';
import { Catalog } from './../../../models/catalog';
import {
  IconDefinition,
  faFileSignature,
  faBuilding,
  faUserPen,
  faCalendarDays,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from './../../../models/service';
import { CustomersService } from './../../../services/customers.service';
import { CustomerToRegisterModel } from './../../../models/customerToRegisterModel';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Subscriptions } from 'src/app/models/subscriptions';
import { Invoices } from 'src/app/models/invoices';
import { InvoicesService } from 'src/app/services/invoices.service';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';
import { deleteCatalogs } from 'src/app/store/catalogsToRegister/catalogsToRegister.actions';

@Component({
  selector: 'app-customer-overview-form',
  templateUrl: './customer-overview-form.component.html',
  styleUrls: ['./customer-overview-form.component.css'],
})
export class CustomerOverviewFormComponent implements OnInit, OnDestroy {
  nameIcon: IconDefinition = faUserPen;
  dateIcon: IconDefinition = faCalendarDays;
  idIcon: IconDefinition = faIdCard;
  companyIcon: IconDefinition = faBuilding;
  taxIcon: IconDefinition = faFileSignature;
  subscription1!: Subscription;
  catalogsStore$!: Observable<Catalog[] | null>;
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;
  services: Service[] = [];

  catalogs: Catalog[] = [];
  customerType: boolean = true;
  //* customerType TRUE ISE INDIVIDUAL
  //* FALSE ISE CORPORATE CUSTOMER

  constructor(
    private servicesService: ServicesService,
    private customersService: CustomersService,
    private subscriptionsService: SubscriptionsService,
    private invoicesService: InvoicesService,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<AppStoreState>
  ) {
    this.catalogsStore$ = this.store.select(
      (s) => s.catalogsToRegister.catalogsToRegister
    );
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    //* OVERVIEW COMPONENT YUKLENDIGINDE STOREDAKI KAYITLI
    //* MUSTERININ BILGILERINI AL VE TURUNU(CORPORATE-INDIVIDUAL) TESPIT ET.
    //* STORE'DA KAYITLI SERVISLERI AL.
    this.catalogsStore$.subscribe((res) => {
      if (res) this.catalogs = res;
      this.catalogs.map((catalog) => {
        this.servicesService.getService(catalog.serviceId).subscribe((res) => {
          this.services.push(res);
        });
      });
    });

    this.subscription1 = this.customerToRegisterModel$.subscribe({
      next: (res: any) => {
        if (res) {
          const { services, ...customer } = res;
          this.customer = customer;

          this.customer.nationalIdentity
            ? (this.customerType = true)
            : (this.customerType = false);
        }
      },
      error: () => {
        this.toastr.error('Something went wrong');
      },
      complete: () => {},
    });
  }

  onSaveCustomer() {
    //* SAVE BUTONUNA BASILDIGINDA YENI BIR CUSTOMER OLUSTUR
    //* CORPORATE TURUNDE ISE CUSTOMER NUMBER = TAXNUMBER OLSUN.
    //* INDIVIDUAL TURUNDE ISE CUSTOMER NUMBER = NATIONAL IDENTITY OLSUN.
    let customer: Customer = {
      customerNumber: 0,
    };
    this.customerType
      ? (customer.customerNumber = +this.customer.nationalIdentity)
      : (customer.customerNumber = +this.customer.taxNumber);
    this.customersService.addCustomer(customer).subscribe({
      next: (res: any) => {
        if (this.customerType) {
          //* INDIVIDUAL CUSTOMER TURUNDE ISE CALIS VE INDIVIDUAL CUSTOMER'A KAYIT EKLE.
          const customerToAdd = {
            customerId: res.id,
            ...this.customer,
            nationalIdentity: res.customerNumber,
          };
          this.customersService.addIndividualCustomer(customerToAdd).subscribe({
            next: (res) => {
              //* ADD SERVICES FONKSIYONUNA PARAMETRE OLARAK RESPONSE GONDER.
              this.addServices(res);
            },
            error: () => {
              this.toastr.error('Something went wrong');
            },
          });
        } else {
          //* CORPORATE CUSTOMER TURUNDE ISE CALIS VE CORPORATE CUSTOMER'A KAYIT EKLE.
          const customerToAdd = {
            customerId: res.id,
            ...this.customer,
            taxNumber: res.customerNumber,
          };
          this.customersService.addCorporateCustomer(customerToAdd).subscribe({
            next: (res) => {
              //* ADD SERVICES FONKSIYONUNA PARAMETRE OLARAK RESPONSE GONDER.
              this.addServices(res);
            },
            error: () => {
              this.toastr.error('Something went wrong.');
            },
          });
        }
      },
      error: () => {
        this.toastr.error('Something went wrong.');
      },
    });
  }
  addServices(customer: any) {
    //* MUSTERI ICIN SECILEN SERVISLERI MAP ILE GEZ.
    //* HER SERVIS ICIN SUBSCRIPTION OLUSTUR VE DB'YE EKLE.
    this.catalogs.map((catalog) => {
      const subscription: Subscriptions = {
        customerId: customer.customerId,
        serviceId: catalog.serviceId,
        catalogId: catalog.id,
        dateStarted: new Date().toISOString().split('T')[0],
      };
      this.subscriptionsService.addSubscription(subscription).subscribe({
        //* SUBSCRIPTION EKLENDIKTEN SONRA ILGILI SUBSCRIPTIONA AIT INVOICE OLUSTUR
        //* OLUSAN INVOICE OBJESINI INVOICES SERVISI ILE DB'YE EKLE.
        next: (response) => {
          let date = new Date(response.dateStarted);
          date.setDate(date.getDate() + 28);
          let dateDue = date.toISOString().split('T')[0];
          let invoice: Invoices = {
            subscriptionId: response.id,
            dateCreated: response.dateStarted,
            dateDue: dateDue,
          };
          this.invoicesService.addInvoice(invoice).subscribe();
        },
        error: () => {
          this.toastr.error('Something went wrong');
        },
        complete: () => {
          this.subscription1.unsubscribe();
          this.customersService.deleteCustomerToRegisterModelStoreState();
          this.store.dispatch(deleteCatalogs());
          this.router.navigateByUrl('/homepage/customers/list');
        },
      });
    });
  }

  onBack() {
    this.router.navigateByUrl('/homepage/newcustomer/services');
  }

  ngOnDestroy(): void {
    this.subscription1.unsubscribe();
  }
}
