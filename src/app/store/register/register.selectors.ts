import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomer from './register.reducer';

export const customerStateSelector = createFeatureSelector<fromCustomer.State>(
  fromCustomer.registerFeatureKey
);

export const selectPaginatedRegisters = createSelector(
  customerStateSelector,
  (state: fromCustomer.State) => state.paginatedRegisters
);
