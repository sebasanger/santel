import { Action, createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { User } from '../../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';

export const customerFeatureKey = 'customer';

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface State extends EntityState<User> {
  paginatedCustomers: GetPaginatedCustomers;
  error: HttpErrorResponse;
  loading: boolean;
}
export const initialState: State = userAdapter.getInitialState({
  paginatedCustomers: null,
  error: null,
  loading: false,
});

export const customerReducer = createReducer(
  initialState,
  on(
    CustomerActions.setPaginatedCustomers,
    (state, { paginatedCustomers }) => ({
      ...state,
      paginatedCustomers,
      error: null,
      loading: false,
    })
  )
);
