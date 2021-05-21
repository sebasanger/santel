import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as registerApiActions from './register.api.actions';
import * as registerActions from './register.actions';
import { RegisterService } from 'src/app/services/EntityServices/register.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private registerService: RegisterService
  ) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerApiActions.getRegistersPaginated),
      mergeMap((action) => {
        return this.registerService
          .paginatedRegisters(
            action.filter,
            action.sortDirection,
            action.sort,
            action.pageIndex,
            action.pageSize
          )
          .pipe(
            map((res: any) => {
              return registerActions.setPaginatedRegisters({
                paginatedRegisters: res,
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
