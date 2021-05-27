import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as roomApiActions from './room.api.actions';
import * as roomActions from './room.actions';
import { RoomService } from 'src/app/services/EntityServices/room.service';

@Injectable({
  providedIn: 'root',
})
export class RoomEffects {
  constructor(private actions$: Actions, private roomService: RoomService) {}

  getAvailableRooms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(roomApiActions.getRoomsAvailables),
      mergeMap((action) => {
        return this.roomService.getFreeRooms(action.freeRoomsPayload).pipe(
          map((res: any) => {
            return roomActions.setAvailablesRooms({
              avaiableRooms: res,
            });
          }),
          catchError((error: any) => {
            throw error;
          })
        );
      })
    );
  });
}
