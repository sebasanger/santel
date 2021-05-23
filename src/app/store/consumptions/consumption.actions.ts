import { createAction, props } from '@ngrx/store';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';

export const setPaginatedConsumptions = createAction(
  '[CONSUMPTIONS]  Set consumptions paginated success...',
  props<{ paginatedConsumptions: GetPaginatedConsumptions }>()
);
