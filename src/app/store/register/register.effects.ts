import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as registerApiActions from './register.api.actions';
import * as registerActions from './register.actions';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private registerService: RegisterService
  ) {}

  getPaginatedRegisters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerApiActions.getRegistersPaginated),
      mergeMap((action) => {
        return this.registerService
          .paginatedRegisters(
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

  closeRegister$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerApiActions.apiCloseRegister),
      mergeMap((action) => {
        return this.registerService
          .closeRegister(action.closeRegisterPayload)
          .pipe(
            map((res: any) => {
              Swal.fire('Success', 'Register now is closed', 'success');
              return registerActions.closeRegister();
            }),
            catchError((error: any) => {
              throw error;
            })
          );
      })
    );
  });

  getRegisterOpen$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registerApiActions.apiGetRegisterOpen),
      mergeMap((action) => {
        return this.registerService.getRegisterOpen().pipe(
          map((res: any) => {
            return registerActions.setRegisterOpen({
              register: res,
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
