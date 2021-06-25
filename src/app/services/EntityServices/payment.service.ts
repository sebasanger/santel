import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddNewPaymentPayload } from 'src/app/interfaces/payments/add-new-payment-payload';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';
import { Payment } from 'src/app/models/payment.model';
import { setSelctedPayments } from 'src/app/store/payments/payment.actions';
import { getPaymentsPaginated } from 'src/app/store/payments/payment.api.actions';
import {
  selectPaginatedPayments,
  selectSelectedPayments,
} from 'src/app/store/payments/payment.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class PaymentService extends EntityCollectionServiceBase<Payment> {
  public paginatedPayments$: Observable<GetPaginatedPayments>;
  public selectedPayments$: Observable<Payment[]>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private paymentStore: Store<{ payment: any }>
  ) {
    super('Payment', serviceElementsFactory);

    this.paginatedPayments$ = this.paymentStore.pipe(
      select(selectPaginatedPayments)
    );
    this.selectedPayments$ = this.paymentStore.pipe(
      select(selectSelectedPayments)
    );
  }

  createPayment(createPaymentPayload: AddNewPaymentPayload) {
    return this.http.post<Payment>(
      `${base_url}payment/save`,
      createPaymentPayload
    );
  }

  paginatedPayments(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) {
    return this.http.get<GetPaginatedPayments>(
      `${base_url}payment/paginate-filter`,
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
  selectPayments(payments: Payment[]) {
    this.paymentStore.dispatch(setSelctedPayments({ payments }));
  }
  getPaginatedPayments(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string
  ) {
    this.paymentStore.dispatch(
      getPaymentsPaginated({
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
}
