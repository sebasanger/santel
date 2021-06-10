import { createAction, props } from '@ngrx/store';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';
import { Register } from 'src/app/models/register.model';

export const setPaginatedRegisters = createAction(
  '[Register]  Set registers paginated success...',
  props<{ paginatedRegisters: GetPaginatedRegisters }>()
);

export const closeRegister = createAction('[Register]  Set close register...');

export const clearUsers = createAction('[Register] Clear registers');

export const setRegisterOpen = createAction(
  '[Register] Set open register',
  props<{ register: Register }>()
);
