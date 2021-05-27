import { createAction, props } from '@ngrx/store';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';

export const getRoomsAvailables = createAction(
  '[ROOM API]  Api get rooms availables...',
  props<{
    freeRoomsPayload: GetFreeRoomsPayload;
  }>()
);
