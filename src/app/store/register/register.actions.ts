import { createAction, props } from '@ngrx/store';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';

export const setPaginatedRegisters = createAction(
  '[Register]  Set registers paginated success...',
  props<{ paginatedRegisters: GetPaginatedRegisters }>()
);

export const clearUsers = createAction('[Register] Clear registers');
