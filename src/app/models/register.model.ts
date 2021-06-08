import { Consumption } from './consuption.model';
import { Payment } from './payment.model';
import { User } from './user.model';

export class Register {
  public id: number;
  public user: User;
  public actualBalance: number;
  public totalPayments: number;
  public active: boolean;
  public openMount: number;
  public closeMount: number;
  public createdAt: Date;
  public closeTime: Date;
  public payments: Payment[];

  constructor(registerInterface: RegisterInterface) {
    this.id = registerInterface.id;
    this.user = registerInterface.user;
    this.actualBalance = registerInterface.actualBalance;
    this.totalPayments = registerInterface.totalPayments;
    this.active = registerInterface.active;
    this.openMount = registerInterface.openMount;
    this.closeMount = registerInterface.closeMount;
    this.createdAt = registerInterface.createdAt;
    this.closeTime = registerInterface.closeTime;
    this.payments = registerInterface.payments;
  }
}

export interface RegisterInterface {
  id?: number;
  user?: User;
  actualBalance?: number;
  totalPayments?: number;
  active?: boolean;
  openMount?: number;
  closeMount?: number;
  createdAt?: Date;
  closeTime?: Date;
  payments?: Payment[];
}
