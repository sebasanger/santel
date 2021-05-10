import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';

import { filter } from 'rxjs/operators';
import {
  EntityAction,
  ofEntityOp,
  OP_ERROR,
  OP_SUCCESS,
  EntityCacheAction,
  EntityOp,
} from '@ngrx/data';
import Swal from 'sweetalert2';

/** Report ngrx-data success/error actions as toast messages **/
@Injectable({ providedIn: 'root' })
export class NgrxDataToastService {
  constructor(actions$: Actions<any>) {
    //On save SUCCESS one entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_ADD_ONE_SUCCESS))
      .subscribe((action) => {
        Swal.fire('Success', action.payload.entityName + ' save', 'success');
      });

    //On save ERROR one entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_ADD_ONE_ERROR))
      .subscribe((action) => {
        Swal.fire('Error on save', action.payload.data.error.message, 'error');
      });

    //On update SUCCESS one entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS))
      .subscribe((action) => {
        Swal.fire('Success', action.payload.entityName + ' updated', 'success');
      });

    //On update ERROR one entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_UPDATE_ONE_ERROR))
      .subscribe((action) => {
        Swal.fire(
          'Error on update',
          action.payload.data.error.message,
          'error'
        );
      });

    //On get all ERROR entity
    actions$.pipe(ofEntityOp(EntityOp.QUERY_ALL_ERROR)).subscribe((action) => {
      Swal.fire('Error on get all', action.payload.entityName, 'error');
    });

    //On delete SUCCESS entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS))
      .subscribe((action) => {
        Swal.fire('Success', action.payload.entityName + ' deleted', 'success');
      });

    //On delete ERROR entity
    actions$
      .pipe(ofEntityOp(EntityOp.SAVE_DELETE_ONE_ERROR))
      .subscribe((action) => {
        Swal.fire(
          action.payload.entityName + ' not deleted',
          action.payload.data.error.message,
          'error'
        );
      });
  }
}
