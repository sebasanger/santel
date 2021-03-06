import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Brand } from 'src/app/models/brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends EntityCollectionServiceBase<Brand> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Brand', serviceElementsFactory);
  }
}
