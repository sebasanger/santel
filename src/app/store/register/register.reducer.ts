import { createReducer, on } from '@ngrx/store';
import * as registerActions from './register.actions';
import { User } from '../../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Register } from 'src/app/models/register.model';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';

export const registerFeatureKey = 'register';

export const registerAdapter: EntityAdapter<Register> =
  createEntityAdapter<Register>();

export interface State extends EntityState<User> {
  paginatedRegisters: GetPaginatedRegisters;
  error: HttpErrorResponse;
  loading: boolean;
  registerActive: Register;
}
export const initialState: State = registerAdapter.getInitialState({
  entities: null,
  error: null,
  loading: false,
  ids: null,
  paginatedRegisters: null,
  registerActive: null,
});

export const registerReducer = createReducer(
  initialState,
  on(
    registerActions.setPaginatedRegisters,
    (state, { paginatedRegisters }) => ({
      ...state,
      paginatedRegisters,
      error: null,
      loading: false,
    })
  ),
  on(registerActions.closeRegister, (state) => ({
    ...state,
    registerActive: null,
  })),
  on(registerActions.setRegisterOpen, (state, { register }) => ({
    ...state,
    registerActive: register,
  }))
);
