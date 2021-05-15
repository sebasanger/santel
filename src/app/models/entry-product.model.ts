import { Product } from './product.model';
import { User } from './user.model';

export class EntryProduct {
  constructor(
    public id: number,
    public product: Product,
    public user: User,
    public amount: number,
    public buyPrice: number,
    public createdAt?: Date
  ) {}
}
