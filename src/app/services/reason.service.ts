import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Reason } from '../models/reason.model';

@Injectable({
  providedIn: 'root',
})
export class ReasonService extends EntityCollectionServiceBase<Reason> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Reason', serviceElementsFactory);
  }
}
