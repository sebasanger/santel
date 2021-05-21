import { createAction, props } from '@ngrx/store';

export const getRegistersPaginated = createAction(
  '[REGISTER API]  Api get register paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);
