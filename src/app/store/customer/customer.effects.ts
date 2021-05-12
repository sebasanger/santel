import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as customerApiActions from './customer.api.actions';
import * as customerActions from './customer.actions';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private router: Router
  ) {}

  getPaginatedUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerApiActions.getCustomersPaginated),
      mergeMap((action) => {
        return this.customerService
          .getPaginatedCustomers(
            action.filter,
            action.sortDirection,
            action.sort,
            action.pageIndex,
            action.pageSize
          )
          .pipe(
            map((res: any) => {
              return customerActions.setPaginatedCustomers({
                paginatedCustomers: res,
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
