import { createAction, props } from '@ngrx/store';

export const getPaymentsPaginated = createAction(
  '[PAYMENT API]  Api get payment paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);
