import { PaymentMethod } from './payment-method.model';
import { Register } from './register.model';
import { Stay } from './stay.model';
import { User } from './user.model';

export class Payment {
  public id: number;
  public amount: number;
  public paymentMethod: PaymentMethod;
  public register: Register;
  public stay: Stay;
  public user: User;
  public createdAt?: Date;
  public stayId: number;
  public registerId: number;

  constructor(conumptionInterface: PaymentInterface) {
    this.id = conumptionInterface.id;
    this.amount = conumptionInterface.amount;
    this.registerId = conumptionInterface.registerId;
    this.stayId = conumptionInterface.stayId;
    this.paymentMethod = conumptionInterface.paymentMethod;
    this.register = conumptionInterface.register;
    this.stay = conumptionInterface.stay;
    this.user = conumptionInterface.user;
    this.createdAt = conumptionInterface.createdAt;
  }
}

export interface PaymentInterface {
  id: number;
  amount: number;
  registerId?: number;
  stayId?: number;
  paymentMethod: PaymentMethod;
  register: Register;
  stay: Stay;
  user: User;
  createdAt?: Date;
}
