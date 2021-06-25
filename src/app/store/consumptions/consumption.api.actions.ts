import { createAction, props } from '@ngrx/store';

export const getConsumptionsPaginated = createAction(
  '[CONSUMPTION API]  Api get consumptions paginated...',
  props<{
    filter: string;
    sortDirection: string;
    sort: string;
    pageIndex: number;
    pageSize: number;
    start: string;
    end: string;
  }>()
);
