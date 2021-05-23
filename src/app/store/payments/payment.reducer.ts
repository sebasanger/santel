import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { User } from '../../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';

export const paymentFeatureKey = 'payment';

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  paginatedPayment: GetPaginatedPayments;
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = userAdapter.getInitialState({
  paginatedPayment: null,
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
  }))
);
