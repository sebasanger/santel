import { createAction, props } from '@ngrx/store';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';
import { Consumption } from 'src/app/models/consuption.model';

export const setPaginatedConsumptions = createAction(
  '[CONSUMPTIONS]  Set consumptions paginated success...',
  props<{ paginatedConsumptions: GetPaginatedConsumptions }>()
);

export const setStayConsumptions = createAction(
  '[CONSUMPTIONS]  Set consumptions for selected stay...',
  props<{ consumptions: Consumption[] }>()
);
