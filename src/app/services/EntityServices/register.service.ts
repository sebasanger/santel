import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { CloseRegisterPayload } from 'src/app/interfaces/registers/closer-register-payload';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';
import { Register } from 'src/app/models/register.model';
import { getRegistersPaginated } from 'src/app/store/register/register.api.actions';
import { apiGetRegisterOpen } from 'src/app/store/register/register.api.actions';
import {
  selectPaginatedRegisters,
  selectRegisterActive,
} from 'src/app/store/register/register.selectors';

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class RegisterService extends EntityCollectionServiceBase<Register> {
  public paginatedRegisters$: Observable<GetPaginatedRegisters>;
  public activeRegister$: Observable<Register>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private registerStore: Store<{ register: any }>
  ) {
    super('Register', serviceElementsFactory);

    this.paginatedRegisters$ = this.registerStore.pipe(
      select(selectPaginatedRegisters)
    );

    this.activeRegister$ = this.registerStore.pipe(
      select(selectRegisterActive)
    );
  }

  paginatedRegisters(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start?: string,
    end?: string
  ) {
    return this.http.get<GetPaginatedCustomers>(
      `${base_url}register/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`)
          .set('start', start)
          .set('end', end),
      }
    );
  }

  selectActiveRegister() {
    this.registerStore.dispatch(apiGetRegisterOpen());
  }

  getPaginatedRegisters(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) {
    this.registerStore.dispatch(
      getRegistersPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
        start,
        end,
      })
    );
  }

  closeRegister(closeRegisterPayload: CloseRegisterPayload) {
    return this.http.put<null>(
      `${base_url}register/close`,
      closeRegisterPayload
    );
  }

  getRegisterOpen() {
    return this.http.get<null>(`${base_url}register/getRegisterOpen`);
  }
}
