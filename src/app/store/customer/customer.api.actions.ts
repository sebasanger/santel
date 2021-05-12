import { createAction, props } from '@ngrx/store';

export const getCustomersPaginated = createAction(
  '[CUSTOMER API]  Api get customer paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);
