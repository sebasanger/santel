import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateStayPayload } from 'src/app/interfaces/stay/CreateStayPayload';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Room } from 'src/app/models/room.model';
import { Stay } from 'src/app/models/stay.model';
import { getStaysPaginated } from 'src/app/store/stay/stay.api.actions';
import { selectPaginatedStays } from 'src/app/store/stay/stay.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class StayService extends EntityCollectionServiceBase<Stay> {
  public paginatedStays$: Observable<GetPaginatedStays>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private stayStore: Store<{ stay: any }>
  ) {
    super('Stay', serviceElementsFactory);

    this.paginatedStays$ = this.stayStore.pipe(select(selectPaginatedStays));
  }

  createStay(createStayPayload: CreateStayPayload) {
    return this.http.post<any>(`${base_url}stay/save`, createStayPayload);
  }

  paginatedStay(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.post<GetPaginatedStays>(
      `${base_url}stay/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }

  getPaginatedStay(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.stayStore.dispatch(
      getStaysPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
      })
    );
  }
}
