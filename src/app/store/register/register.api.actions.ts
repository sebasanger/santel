import { createAction, props } from '@ngrx/store';
import { CloseRegisterPayload } from 'src/app/interfaces/registers/closer-register-payload';

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

export const apiCloseRegister = createAction(
  '[REGISTER API]  Api get register paginated...',
  props<{
    closeRegisterPayload: CloseRegisterPayload;
  }>()
);
