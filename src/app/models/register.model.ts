import { Consumption } from './consuption.model';
import { Payment } from './payment.model';
import { User } from './user.model';

export class Register {
  public id: number;
  public user: User;
  public balance: number;
  public active: boolean;
  public openMount: number;
  public closeMount: number;
  public createdAt: Date;
  public closeTime: Date;

  public consumptions: Consumption[];
  public payments: Payment[];

  constructor(registerInterface: RegisterInterface) {
    this.id = registerInterface.id;
    this.user = registerInterface.user;
    this.balance = registerInterface.balance;
    this.active = registerInterface.active;
    this.openMount = registerInterface.openMount;
    this.closeMount = registerInterface.closeMount;
    this.createdAt = registerInterface.createdAt;
    this.closeTime = registerInterface.closeTime;
    this.consumptions = registerInterface.consumptions;
    this.payments = registerInterface.payments;
  }
}

export interface RegisterInterface {
  id?: number;
  user?: User;
  balance?: number;
  active?: boolean;
  openMount?: number;
  closeMount?: number;
  createdAt?: Date;
  closeTime?: Date;
  consumptions?: Consumption[];
  payments?: Payment[];
}
