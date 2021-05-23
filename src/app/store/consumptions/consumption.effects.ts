import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as consumptionApiActions from './consumption.api.actions';
import * as consumptionActions from './consumption.actions';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionEffects {
  constructor(
    private actions$: Actions,
    private consumptionService: ConsumptionService
  ) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(consumptionApiActions.getConsumptionsPaginated),
      mergeMap((action) => {
        return this.consumptionService
          .paginatedConsumptions(
            action.filter,
            action.sortDirection,
            action.sort,
            action.pageIndex,
            action.pageSize
          )
          .pipe(
            map((res: any) => {
              return consumptionActions.setPaginatedConsumptions({
                paginatedConsumptions: res,
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
