import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { EntryProduct } from 'src/app/models/entry-product.model';

@Injectable({
  providedIn: 'root',
})
export class EntryProductService extends EntityCollectionServiceBase<EntryProduct> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('EntryProduct', serviceElementsFactory);
  }
}
