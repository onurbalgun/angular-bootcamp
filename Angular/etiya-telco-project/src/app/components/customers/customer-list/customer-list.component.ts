import { Component, OnInit } from '@angular/core';

import { CorporateCustomer } from 'src/app/models/corporateCustomer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  corporateCustomers!: CorporateCustomer[];
  showIndividualCustomers: boolean = true;
  customerTypeText: string = 'Individual';
  customerType: string = 'Individual Customers';

  constructor() {}

  ngOnInit(): void {
    //* INDIVIDUAL VE CORPORATE CUSTOMERLARI GETIREN FONKSIYONLARI CAGIR.
  }

  onCustomerTypeChange(type: string) {
    //* SELECT INPUTU DEGISTIGINDE LIST EKRANINDA GOZUKEN TEXT'I GUNCELLE.
    //* SECILEN MUSTERI TURUNE AIT BLOGU GOSTER. DIGERINI GIZLE.
    if (type === 'Individual Customers') {
      this.customerTypeText = 'Individual';
      this.showIndividualCustomers = true;
    } else {
      this.customerTypeText = 'Corporate';
      this.showIndividualCustomers = false;
    }
  }
}
