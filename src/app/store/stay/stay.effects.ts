import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as stayApiActions from './stay.api.actions';
import * as stayActions from './stay.actions';
import { StayService } from 'src/app/services/EntityServices/stay.service';

@Injectable({
  providedIn: 'root',
})
export class StayEffects {
  constructor(private actions$: Actions, private stayService: StayService) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stayApiActions.getStaysPaginated),
      mergeMap((action) => {
        return this.stayService
          .paginatedStay(
            action.filter,
            action.sortDirection,
            action.sort,
            action.pageIndex,
            action.pageSize,
            action.start,
            action.end
          )
          .pipe(
            map((res: any) => {
              return stayActions.setPaginatedStays({
                paginatedStays: res,
              });
            }),
            catchError((error: any) => {
              throw error;
            })
          );
      })
    );
  });

  getStayById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stayApiActions.getStayByIdApi),
      mergeMap((action) => {
        return this.stayService.getById(action.id).pipe(
          map((res: any) => {
            return stayActions.setSelectedStay({
              stay: res,
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
