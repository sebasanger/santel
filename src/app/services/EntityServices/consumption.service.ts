import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Consumption } from 'src/app/models/consuption.model';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionService extends EntityCollectionServiceBase<Consumption> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Consumption', serviceElementsFactory);
  }
}
