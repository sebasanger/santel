import { createAction, props } from '@ngrx/store';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';

export const setPaginatedCustomers = createAction(
  '[CUSTOMER]  Set customers paginated success...',
  props<{ paginatedCustomers: GetPaginatedCustomers }>()
);

export const clearUsers = createAction('[Customer] Clear Customer');
