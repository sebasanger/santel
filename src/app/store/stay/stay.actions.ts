import { createAction, props } from '@ngrx/store';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';

export const setPaginatedStays = createAction(
  '[STAY]  Set stays paginated success...',
  props<{ paginatedStays: GetPaginatedStays }>()
);
