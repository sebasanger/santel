import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { PaymentMethod } from 'src/app/models/payment-method.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentMethodService extends EntityCollectionServiceBase<PaymentMethod> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PaymentMethod', serviceElementsFactory);
  }
}
