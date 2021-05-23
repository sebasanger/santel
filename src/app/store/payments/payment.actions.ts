import { createAction, props } from '@ngrx/store';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';

export const setPaginatedPayment = createAction(
  '[PAYMENT]  Set customers paginated success...',
  props<{ paginatedPayment: GetPaginatedPayments }>()
);
