import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomer from './customer.reducer';

export const customerStateSelector = createFeatureSelector<fromCustomer.State>(
  fromCustomer.customerFeatureKey
);

export const selectPaginatedCustomers = createSelector(
  customerStateSelector,
  (state: fromCustomer.State) => state.paginatedCustomers
);
