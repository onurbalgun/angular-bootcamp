import { CustomerToRegisterModel } from './../../../models/customerToRegisterModel';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.css'],
})
export class CustomerInfoFormComponent implements OnInit, OnDestroy {
  //* BASLANGICTA CUSTOMER TYPE INDIVIDUAL OLARAK BELIRLE.
  subscription1!: Subscription;
  customerValues: any;
  customerType: string = 'Individual Customer';
  customerInfoForm!: FormGroup;
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  dateOfToday = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private router: Router
  ) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.createCustomerInfoForm();
  }

  onCustomerTypeChange(type: string) {
    //* CUSTOMER TYPE SECIMI YAPILAN INPUT HER DEGISTIGINDE YENI FORM OLUSTUR.
    this.customersService.deleteCustomerToRegisterModelStoreState();
    this.customerType = type;
    this.createCustomerInfoForm();
  }

  onSubmit() {
    //* FORMA GIRILEN BILGILERI STORE'A KAYDET VE SERVIS SECIM EKRANINA YONLENDIR.
    this.customersService.setCustomerToRegisterModelStoreState({
      ...this.customerValues,
      ...this.customerInfoForm.value,
    });
    this.router.navigateByUrl('homepage/newcustomer/services');
  }

  createCustomerInfoForm() {
    //* CUSTOMER TYPE'A GORE FORM BUILDER ILE FORM OLUSTUR.
    //* EGER STORE'DA KAYITLI VERI VARSA ILK OLARAK O DEGERLERI FORMDA GOSTER.
    this.subscription1 = this.customerToRegisterModel$.subscribe({
      next: (res: any) => {
        this.customerValues = res;
      },
      complete: () => {},
    });
    if (this.customerValues) {
      this.customerType = this.customerValues?.firstName
        ? 'Individual Customer'
        : 'Corporate Customer';
    }
    if (this.customerType === 'Individual Customer') {
      this.customerInfoForm = this.fb.group({
        firstName: [this.customerValues?.firstName || '', Validators.required],
        lastName: [this.customerValues?.lastName || '', Validators.required],
        nationalIdentity: [
          this.customerValues?.nationalIdentity || '',
          Validators.required,
        ],
        dateOfBirth: [
          this.customerValues?.dateOfBirth || '',
          Validators.required,
        ],
      });
    } else {
      this.customerInfoForm = this.fb.group({
        companyName: [
          this.customerValues?.companyName || '',
          Validators.required,
        ],
        taxNumber: [this.customerValues?.taxNumber || '', Validators.required],
      });
    }
  }

  onReset() {
    this.customerInfoForm.reset();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }
}
