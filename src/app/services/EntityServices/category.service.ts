import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { Category } from 'src/app/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends EntityCollectionServiceBase<Category> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Category', serviceElementsFactory);
  }
}
