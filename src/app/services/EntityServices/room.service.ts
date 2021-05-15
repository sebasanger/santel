import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Room } from 'src/app/models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityCollectionServiceBase<Room> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Room', serviceElementsFactory);
  }
}
