import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';

export const setAvailablesRooms = createAction(
  '[ROOMS]  Set availables rooms success...',
  props<{ avaiableRooms: Room[] }>()
);
export const setSelectedRoom = createAction(
  '[ROOMS]  Set selected rooms success...',
  props<{ selectedRoom: number }>()
);
