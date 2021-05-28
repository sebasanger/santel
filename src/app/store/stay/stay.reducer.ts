import { createReducer, on } from '@ngrx/store';
import * as StayActions from './stay.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Stay } from 'src/app/models/stay.model';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';
import { Customer } from 'src/app/models/customer.model';

export const stayFeatureKey = 'stay';

export const stayAdapter: EntityAdapter<Stay> = createEntityAdapter<Stay>();

const base: Customer[] = [
  { id: 1, name: 'Carlos', surname: 'rivera', dni: '1231231', birthday: null },

  { id: 2, name: 'Nico', surname: 'rivera', dni: '123132', birthday: null },

  { id: 3, name: 'Franco', surname: 'rivera', dni: '1234325', birthday: null },
];
export interface State extends EntityState<Stay> {
  paginatedStays: GetPaginatedStays;
  selectedCustomers: Customer[];
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = stayAdapter.getInitialState({
  paginatedStays: null,
  selectedCustomers: base,
  error: null,
  loading: false,
});

export const stayReducer = createReducer(
  initialState,
  on(StayActions.setPaginatedStays, (state, { paginatedStays }) => ({
    ...state,
    paginatedStays,
    error: null,
    loading: false,
  })),
  on(StayActions.addSelectCustomer, (state, { customer }) => ({
    ...state,
    customer,
  }))
);
