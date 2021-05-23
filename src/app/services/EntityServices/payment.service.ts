import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';
import { Payment } from 'src/app/models/payment.model';
import { getPaymentsPaginated } from 'src/app/store/payments/payment.api.actions';
import { selectPaginatedPayments } from 'src/app/store/payments/payment.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PaymentService extends EntityCollectionServiceBase<Payment> {
  public paginatedPayments$: Observable<GetPaginatedPayments>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private paymentStore: Store<{ payment: any }>
  ) {
    super('Payment', serviceElementsFactory);

    this.paginatedPayments$ = this.paymentStore.pipe(
      select(selectPaginatedPayments)
    );
  }

  paginatedPayments(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedPayments>(
      `${base_url}payment/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }

  getPaginatedPayments(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.paymentStore.dispatch(
      getPaymentsPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
      })
    );
  }
}
