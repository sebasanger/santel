import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateUpdateStayPayload } from 'src/app/interfaces/stay/CreateStayPayload';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';
import { Stay } from 'src/app/models/stay.model';
import { getStaysPaginated } from 'src/app/store/stay/stay.api.actions';
import { getStayByIdApi } from 'src/app/store/stay/stay.api.actions';
import {
  selectPaginatedStays,
  selectSelectedStay,
} from 'src/app/store/stay/stay.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class StayService extends EntityCollectionServiceBase<Stay> {
  public paginatedStays$: Observable<GetPaginatedStays>;
  public selectedStay$: Observable<Stay>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private stayStore: Store<{ stay: any }>
  ) {
    super('Stay', serviceElementsFactory);

    this.paginatedStays$ = this.stayStore.pipe(select(selectPaginatedStays));
    this.selectedStay$ = this.stayStore.pipe(select(selectSelectedStay));
  }

  createStay(createStayPayload: CreateUpdateStayPayload) {
    return this.http.post<any>(`${base_url}stay/save`, createStayPayload);
  }

  getStayByKey(id: number) {
    this.stayStore.dispatch(getStayByIdApi({ id }));
  }

  getById(id: number) {
    return this.http.get<Stay>(`${base_url}stay/${id}`);
  }

  updateStay(updateStayPayload: CreateUpdateStayPayload) {
    return this.http.put<any>(`${base_url}stay/update`, updateStayPayload);
  }

  finishStay(id: number) {
    return this.http.put<any>(`${base_url}stay/finish/${id}`, 'finish');
  }

  paginatedStay(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string,
    status: string
  ) {
    return this.http.get<GetPaginatedStays>(`${base_url}stay/paginate-filter`, {
      params: new HttpParams()
        .set('page', pageIndex.toString())
        .set('filter', filter)
        .set('size', pageSize.toString())
        .set('sort', `${sort},${sortDirection}`)
        .set('start', start)
        .set('end', end)
        .set('status', status),
    });
  }

  getPaginatedStay(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number,
    start: string,
    end: string,
    status: string
  ) {
    this.stayStore.dispatch(
      getStaysPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
        start,
        end,
        status,
      })
    );
  }
}
