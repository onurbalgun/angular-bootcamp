import { Component, Input, OnInit } from '@angular/core';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { CustomersService } from 'src/app/services/customers.service';
import {
  IconDefinition,
  faUserPen,
  faCalendarDays,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-individual-details',
  templateUrl: './individual-details.component.html',
  styleUrls: ['./individual-details.component.css'],
})
export class IndividualDetailsComponent implements OnInit {
  nameIcon: IconDefinition = faUserPen;
  dateIcon: IconDefinition = faCalendarDays;
  idIcon: IconDefinition = faIdCard;
  @Input() selectedUserID!: number;
  individualCustomerDetails!: IndividualCustomer[];
  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.getIndividualCustomer(this.selectedUserID);
  }

  getIndividualCustomer(id: number) {
    //* CUSTOMER ID YE AIT BILGILERI INDIVIDUAL CUSTOMERS UZERINDEN GETIR
    this.customersService.getIndividualCustomer(id).subscribe((res) => {
      this.individualCustomerDetails = res;
    });
  }
}
