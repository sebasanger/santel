import { Brand } from './brand.model';
import { Category } from './category.model';
import { Image } from './image.model';

export class Product {
  constructor(
    public id: number,
    public code: string,
    public name: string,
    public price: number,
    public stock: number,
    public brand: Brand,
    public category: Category,
    public createdAt?: Date,
    public updatedAt?: Date,
    public images?: Image[]
  ) {}
}
