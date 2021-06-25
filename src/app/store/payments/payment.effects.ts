import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as paymentApiActions from './payment.api.actions';
import * as paymentActions from './payment.actions';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService
  ) {}

  getPaginatedPayments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(paymentApiActions.getPaymentsPaginated),
      mergeMap((action) => {
        return this.paymentService
          .paginatedPayments(
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
              return paymentActions.setPaginatedPayment({
                paginatedPayment: res,
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
