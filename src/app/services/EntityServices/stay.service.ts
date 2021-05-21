import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Stay } from 'src/app/models/stay.model';

@Injectable({
  providedIn: 'root',
})
export class StayService extends EntityCollectionServiceBase<Stay> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Stay', serviceElementsFactory);
  }
}
