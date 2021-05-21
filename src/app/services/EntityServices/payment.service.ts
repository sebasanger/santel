import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Payment } from 'src/app/models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService extends EntityCollectionServiceBase<Payment> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Payment', serviceElementsFactory);
  }
}
