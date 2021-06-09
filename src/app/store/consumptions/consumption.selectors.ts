import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConsumption from './consumption.reducer';

export const consumptionStateSelector =
  createFeatureSelector<fromConsumption.State>(
    fromConsumption.consumptionFeatureKey
  );

export const selectPaginatedConsumptions = createSelector(
  consumptionStateSelector,
  (state: fromConsumption.State) => state.paginatedConsumptions
);

export const selectSelectedStayConsumptions = createSelector(
  consumptionStateSelector,
  (state: fromConsumption.State) => state.stayConsumptions
);
