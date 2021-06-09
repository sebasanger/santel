import { createAction, props } from '@ngrx/store';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';
import { Payment } from 'src/app/models/payment.model';

export const setPaginatedPayment = createAction(
  '[PAYMENT]  Set customers paginated success...',
  props<{ paginatedPayment: GetPaginatedPayments }>()
);

export const setSelctedPayments = createAction(
  '[PAYMENT]  Set selected payments...',
  props<{ payments: Payment[] }>()
);
