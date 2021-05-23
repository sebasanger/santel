import { createReducer, on } from '@ngrx/store';
import * as ConsumptionActions from './consumption.actions';
import { User } from '../../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';
import { Consumption } from 'src/app/models/consuption.model';

export const consumptionFeatureKey = 'consumption';

export const consumptionAdapter: EntityAdapter<Consumption> =
  createEntityAdapter<Consumption>();

export interface State extends EntityState<Consumption> {
  paginatedConsumptions: GetPaginatedConsumptions;
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = consumptionAdapter.getInitialState({
  paginatedConsumptions: null,
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
  )
);
