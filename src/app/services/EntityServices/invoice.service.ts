import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Invoice } from 'src/app/models/inovice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends EntityCollectionServiceBase<Invoice> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Invoice', serviceElementsFactory);
  }
}
