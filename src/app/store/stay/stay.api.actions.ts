import { createAction, props } from '@ngrx/store';

export const getStaysPaginated = createAction(
  '[STAY API]  Api get stays paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
    start: string;
    end: string;
    status: string;
  }>()
);

export const getStayByIdApi = createAction(
  '[STAY API]  Api get stay by id...',
  props<{
    id: number;
  }>()
);
