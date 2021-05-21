import { Product } from './product.model';
import { Register } from './register.model';
import { Stay } from './stay.model';
import { User } from './user.model';

export class Consumption {
  public id: number;
  public amount: number;
  public price: number;
  public paid: boolean;
  public product: Product;
  public register: Register;
  public user: User;
  public stay: Stay;
  public createdAt: Date;

  constructor(conumptionInterface: ConsumptionInterface) {
    this.id = conumptionInterface.id;
    this.amount = conumptionInterface.amount;
    this.price = conumptionInterface.price;
    this.paid = conumptionInterface.paid;
    this.product = conumptionInterface.product;
    this.register = conumptionInterface.register;
    this.user = conumptionInterface.user;
    this.createdAt = conumptionInterface.createdAt;
    this.stay = conumptionInterface.stay;
  }
}

export interface ConsumptionInterface {
  id: number;
  amount: number;
  price: number;
  paid: boolean;
  product: Product;
  register: Register;
  user: User;
  stay: Stay;
  createdAt?: Date;
}
