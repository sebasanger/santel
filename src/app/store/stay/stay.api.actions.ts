import { createAction, props } from '@ngrx/store';

export const getStaysPaginated = createAction(
  '[STAY API]  Api get stays paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
  }>()
);
