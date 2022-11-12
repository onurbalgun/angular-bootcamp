import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.customerService.deleteCustomerToRegisterModelStoreState();
  }
}
