import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/models/room.model';

export const setAvailablesRooms = createAction(
  '[ROOMS]  Set availables rooms success...',
  props<{ avaiableRooms: Room[] }>()
);
