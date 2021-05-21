import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Register } from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends EntityCollectionServiceBase<Register> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Register', serviceElementsFactory);
  }
}
