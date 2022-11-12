import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoices } from '../models/invoices';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  private controllerUrl = `${environment.apiUrl}/invoices`;

  constructor(private httpClient: HttpClient) {}
  //* /invoices ADRESINE KAYIT OLUSTUR.
  addInvoice(invoice: Invoices) {
    return this.httpClient.post<Invoices>(`${this.controllerUrl}`, invoice);
  }
}
