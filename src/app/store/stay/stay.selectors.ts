import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStay from './stay.reducer';

export const stayStateSelector = createFeatureSelector<fromStay.State>(
  fromStay.stayFeatureKey
);

export const selectPaginatedStays = createSelector(
  stayStateSelector,
  (state: fromStay.State) => state.paginatedStays
);
