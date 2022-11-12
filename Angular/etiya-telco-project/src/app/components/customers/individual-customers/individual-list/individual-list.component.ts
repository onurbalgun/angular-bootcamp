import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faCircleInfo,
  IconDefinition,
  faUserPen,
  faCalendarDays,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-individual-list',
  templateUrl: './individual-list.component.html',
  styleUrls: ['./individual-list.component.css'],
})
export class IndividualListComponent implements OnInit {
  searchName: string = '';
  searchSurName: string = '';
  searchDate: Date = new Date(1970, 1, 1);
  individualCustomers!: IndividualCustomer[];
  updateIcon: IconDefinition = faCircleInfo;
  nameIcon: IconDefinition = faUserPen;
  dateIcon: IconDefinition = faCalendarDays;
  idIcon: IconDefinition = faIdCard;
  dateOfToday = new Date().toISOString().split('T')[0];
  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    this.getIndividualCustomers();
  }
  getIndividualCustomers() {
    //* INDIVIDUAL CUSTOMERLARI GETIR.
    this.customersService.getIndividualCustomers().subscribe({
      next: (response) => {
        this.individualCustomers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goToDetails(id: number) {
    //* SECILI MUSTERININ ID SINI AL VE DETAY SAYFASINA YONLENDIR.
    this.router.navigateByUrl(`${this.router.url}/${id}`, {
      state: { customerType: 'individual' },
    });
  }

  onReset() {
    this.searchName = '';
    this.searchSurName = '';
    this.searchDate = new Date(1970, 1, 1);
  }
}
