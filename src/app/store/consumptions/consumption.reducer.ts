import { createReducer, on } from '@ngrx/store';
import * as ConsumptionActions from './consumption.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';
import { Consumption } from 'src/app/models/consuption.model';

export const consumptionFeatureKey = 'consumption';

export const consumptionAdapter: EntityAdapter<Consumption> =
  createEntityAdapter<Consumption>();

export interface State extends EntityState<Consumption> {
  paginatedConsumptions: GetPaginatedConsumptions;
  stayConsumptions: Consumption[];
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = consumptionAdapter.getInitialState({
  paginatedConsumptions: null,
  stayConsumptions: null,
  error: null,
  loading: false,
});

export const consumptionReducer = createReducer(
  initialState,
  on(
    ConsumptionActions.setPaginatedConsumptions,
    (state, { paginatedConsumptions }) => ({
      ...state,
      paginatedConsumptions,
      error: null,
      loading: false,
    })
  ),
  on(ConsumptionActions.setStayConsumptions, (state, { consumptions }) => ({
    ...state,
    stayConsumptions: consumptions,
  }))
);
