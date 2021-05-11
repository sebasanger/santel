import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { RoomPrice } from 'src/app/models/room-price.model';

@Injectable({
  providedIn: 'root',
})
export class RoomPriceService extends EntityCollectionServiceBase<RoomPrice> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('RoomPrice', serviceElementsFactory);
  }
}
