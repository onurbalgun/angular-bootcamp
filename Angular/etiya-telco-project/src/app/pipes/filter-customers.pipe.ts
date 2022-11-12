import { Pipe, PipeTransform } from '@angular/core';
import { IndividualCustomer } from '../models/individualCustomer';

@Pipe({
  name: 'filterCustomers',
})
export class FilterCustomersPipe implements PipeTransform {
  transform(value: IndividualCustomer[], ...args: any[]): IndividualCustomer[] {
    //* INDIVIDUAL CUSTOMER DIZISI OLARAK GELEN VERIYI
    //* FIRSTNAME | LASTNAME | DATEOFBIRTH PARAMETERLERINDEN GELEN VERILERE
    //* GORE FILTRELE.
    return value?.filter((customer: IndividualCustomer) => {
      const [year, month, day] = customer.dateOfBirth.split('-');
      let date = new Date(+year, +month - 1, +day);
      return (
        customer.firstName
          .toLocaleLowerCase()
          .includes(args[0].toLocaleLowerCase()) &&
        customer.lastName
          .toLocaleLowerCase()
          .includes(args[1].toLocaleLowerCase()) &&
        date > new Date(args[2])
      );
    });
  }
}
