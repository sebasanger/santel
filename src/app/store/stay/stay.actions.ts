import { createAction, props } from '@ngrx/store';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';
import { Customer } from 'src/app/models/customer.model';

export const setPaginatedStays = createAction(
  '[STAY]  Set stays paginated success...',
  props<{ paginatedStays: GetPaginatedStays }>()
);

export const addSelectCustomer = createAction(
  '[STAY]  Add selected customer...',
  props<{ customer: Customer }>()
);
