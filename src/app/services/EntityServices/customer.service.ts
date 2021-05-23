import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { Customer } from 'src/app/models/customer.model';
import { getCustomersPaginated } from 'src/app/store/customer/customer.api.actions';
import { selectPaginatedCustomers } from 'src/app/store/customer/customer.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class CustomerService extends EntityCollectionServiceBase<Customer> {
  public paginatedCustomers$: Observable<GetPaginatedCustomers>;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private customerStore: Store<{ customer: any }>
  ) {
    super('Customer', serviceElementsFactory);

    this.paginatedCustomers$ = this.customerStore.pipe(
      select(selectPaginatedCustomers)
    );
  }

  paginatedCustomers(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedCustomers>(
      `${base_url}customer/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }

  getPaginatedCustomers(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.customerStore.dispatch(
      getCustomersPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
      })
    );
  }
}
