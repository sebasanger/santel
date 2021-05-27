import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoom from './room.reducer';

export const roomStateSelector = createFeatureSelector<fromRoom.State>(
  fromRoom.roomFeatureKey
);

export const selectAvailableRooms = createSelector(
  roomStateSelector,
  (state: fromRoom.State) => state.availableRooms
);
