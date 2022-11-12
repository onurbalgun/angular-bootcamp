import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalog } from '../models/catalog';

@Injectable({
  providedIn: 'root',
})
export class CatalogsService {
  private controllerUrl = `${environment.apiUrl}/catalogs`;
  constructor(private httpClient: HttpClient) {}
  addCatalog(catalog: Catalog): Observable<Catalog> {
    return this.httpClient.post<Catalog>(this.controllerUrl, catalog);
  }
  updateCatalog(catalog: Catalog): Observable<Catalog> {
    return this.httpClient.put<Catalog>(
      `${this.controllerUrl}/${catalog.id}`,
      catalog
    );
  }
  getCatalogs(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(this.controllerUrl);
  }

  getCatalog(id: number): Observable<Catalog> {
    return this.httpClient.get<Catalog>(`${this.controllerUrl}/${id}`);
  }
  getCatalogsByServiceId(serviceId: number): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(
      `${this.controllerUrl}?serviceId=${serviceId}`
    );
  }

  deleteCatalog(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }
}
