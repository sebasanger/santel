import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';
import { Payment } from 'src/app/models/payment.model';

export const paymentFeatureKey = 'payment';

export const paymentAdapter: EntityAdapter<Payment> =
  createEntityAdapter<Payment>();

export interface State extends EntityState<Payment> {
  paginatedPayment: GetPaginatedPayments;
  selectedPayments: Payment[];
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = paymentAdapter.getInitialState({
  paginatedPayment: null,
  selectedPayments: null,
  error: null,
  loading: false,
});

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.setPaginatedPayment, (state, { paginatedPayment }) => ({
    ...state,
    paginatedPayment,
    error: null,
    loading: false,
  })),
  on(PaymentActions.setSelctedPayments, (state, { payments }) => ({
    ...state,
    selectedPayments: payments,
  }))
);
