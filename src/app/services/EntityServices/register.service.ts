import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';
import { Register } from 'src/app/models/register.model';
import { getRegistersPaginated } from 'src/app/store/register/register.api.actions';
import { selectPaginatedRegisters } from 'src/app/store/register/register.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class RegisterService extends EntityCollectionServiceBase<Register> {
  public paginatedRegisters$: Observable<GetPaginatedRegisters>;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private registerStore: Store<{ register: any }>
  ) {
    super('Register', serviceElementsFactory);

    this.paginatedRegisters$ = this.registerStore.pipe(
      select(selectPaginatedRegisters)
    );
  }

  paginatedRegisters(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedCustomers>(
      `${base_url}register/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }

  getPaginatedRegisters(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.registerStore.dispatch(
      getRegistersPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
      })
    );
  }
}
