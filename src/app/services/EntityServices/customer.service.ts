import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class CustomerService extends EntityCollectionServiceBase<Customer> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Customer', serviceElementsFactory);
  }

  getPaginatedCustomers(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedCustomers>(
      `${base_url}customer/paginated`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }
}
