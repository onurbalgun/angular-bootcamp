import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleInfo,
  IconDefinition,
  faFileSignature,
  faBuilding,
} from '@fortawesome/free-solid-svg-icons';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-corporate-list',
  templateUrl: './corporate-list.component.html',
  styleUrls: ['./corporate-list.component.css'],
})
export class CorporateListComponent implements OnInit {
  corporateCustomers!: CorporateCustomer[];
  searchCompanyName: string = '';
  searchId: string = '';
  searchTax: string = '';
  updateIcon: IconDefinition = faCircleInfo;
  companyIcon: IconDefinition = faBuilding;
  taxIcon: IconDefinition = faFileSignature;
  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getCorporateCustomers();
  }

  getCorporateCustomers() {
    //* CORPORATE CUSTOMERLARI GETIR.
    this.customersService.getCorporateCustomers().subscribe({
      next: (response) => {
        this.corporateCustomers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  goToDetails(id: number) {
    //* SECILI MUSTERININ ID SINI AL VE DETAY SAYFASINA YONLENDIR.
    this.router.navigateByUrl(`${this.router.url}/${id}`, {
      state: { customerType: 'corporate' },
    });
  }

  onReset() {
    this.searchId = '';
    this.searchCompanyName = '';    
    this.searchTax= '';    
  }
}
