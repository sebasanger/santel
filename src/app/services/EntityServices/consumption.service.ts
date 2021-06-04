import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddNewConsumptionPayload } from 'src/app/interfaces/consumptions/add-new-consumption-payload';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';
import { Consumption } from 'src/app/models/consuption.model';
import { getConsumptionsPaginated } from 'src/app/store/consumptions/consumption.api.actions';
import { selectPaginatedConsumptions } from 'src/app/store/consumptions/consumption.selectors';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ConsumptionService extends EntityCollectionServiceBase<Consumption> {
  public paginatedConsumptions$: Observable<GetPaginatedConsumptions>;
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient,
    private consumptionStore: Store<{ payment: any }>
  ) {
    super('Consumption', serviceElementsFactory);
    this.paginatedConsumptions$ = this.consumptionStore.pipe(
      select(selectPaginatedConsumptions)
    );
  }

  createConsumption(createConsumptionPayload: AddNewConsumptionPayload) {
    return this.http.post<any>(
      `${base_url}consumption/save`,
      createConsumptionPayload
    );
  }

  paginatedConsumptions(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get<GetPaginatedConsumptions>(
      `${base_url}consumption/paginate-filter`,
      {
        params: new HttpParams()
          .set('page', pageIndex.toString())
          .set('filter', filter)
          .set('size', pageSize.toString())
          .set('sort', `${sort},${sortDirection}`),
      }
    );
  }

  getPaginatedConsumptions(
    filter: string,
    sortDirection: string,
    sort: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.consumptionStore.dispatch(
      getConsumptionsPaginated({
        filter,
        pageIndex,
        pageSize,
        sortDirection,
        sort,
      })
    );
  }
}
