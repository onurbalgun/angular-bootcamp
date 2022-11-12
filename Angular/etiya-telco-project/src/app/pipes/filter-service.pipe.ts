import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../models/service';

@Pipe({
  name: 'filterService',
})
export class FilterServicePipe implements PipeTransform {
  //* SERVIS ARRAYI OLARAK GELEN VERIYI SERVICENAME PARAMETRESINDEN
  //* GELEN VERIYE GORE FILTRELE.
  transform(value: Service[], name: string): Service[] {
    return value.filter((service) =>
      service.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
}
