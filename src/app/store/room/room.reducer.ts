import { createReducer, on } from '@ngrx/store';
import * as RoomActions from './room.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { HttpErrorResponse } from '@angular/common/http';
import { Room } from 'src/app/models/room.model';

export const roomFeatureKey = 'room';

export const roomAdapter: EntityAdapter<Room> = createEntityAdapter<Room>();

export interface State extends EntityState<Room> {
  availableRooms: Room[];
  error: HttpErrorResponse;
  loading: boolean;
  selectedRoom: number;
}
export const initialState: State = roomAdapter.getInitialState({
  availableRooms: null,
  error: null,
  loading: false,
  selectedRoom: null,
});

export const roomReducer = createReducer(
  initialState,
  on(RoomActions.setAvailablesRooms, (state, { avaiableRooms }) => ({
    ...state,
    availableRooms: avaiableRooms,
    error: null,
    loading: false,
  })),
  on(RoomActions.setSelectedRoom, (state, { selectedRoom }) => ({
    ...state,
    selectedRoom,
  }))
);
