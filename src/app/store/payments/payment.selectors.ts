import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPayment from './payment.reducer';

export const paymentStateSelector = createFeatureSelector<fromPayment.State>(
  fromPayment.paymentFeatureKey
);

export const selectPaginatedPayments = createSelector(
  paymentStateSelector,
  (state: fromPayment.State) => state.paginatedPayment
);

export const selectSelectedPayments = createSelector(
  paymentStateSelector,
  (state: fromPayment.State) => state.selectedPayments
);
