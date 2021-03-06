import { Customer } from './customer.model';
import { Reason } from './reason.model';
import { Consumption } from './consuption.model';
import { RoomPrice } from './room-price.model';
import { Room } from './room.model';
import { User } from './user.model';
import { Payment } from './payment.model';

export class Stay {
  public id: number;
  public status: 'ACTIVE' | 'PENDING' | 'FINISHED';
  public checkIn: Date;
  public checkOut: Date;
  public entryDate: Date;
  public outDate: Date;
  public totalPayments: number;
  public totalConsumptions: number;
  public totalToPay: number;
  public totalRemaining: number;
  public pricePerDay: number;
  public totalGuest: number;
  public createdAt: number;
  public updatedAt: number;
  public destiny: string;
  public origin: string;

  public room: Room;
  public roomPrice: RoomPrice;
  public reason: Reason;
  public user: User;
  public customers: Customer[];
  public consumptions: Consumption[];
  public payments: Payment[];

  constructor(stayInterface: StayInterface) {
    this.id = stayInterface.id;
    this.status = stayInterface.status;
    this.checkIn = stayInterface.checkIn;
    this.checkOut = stayInterface.checkOut;
    this.entryDate = stayInterface.entryDate;
    this.outDate = stayInterface.outDate;
    this.totalPayments = stayInterface.totalPayments;
    this.totalConsumptions = stayInterface.totalConsumptions;
    this.totalRemaining = stayInterface.totalRemaining;
    this.pricePerDay = stayInterface.pricePerDay;
    this.totalGuest = stayInterface.totalGuest;
    this.totalToPay = stayInterface.totalToPay;
    this.createdAt = stayInterface.createdAt;
    this.updatedAt = stayInterface.updatedAt;
    this.destiny = stayInterface.destiny;
    this.origin = stayInterface.origin;

    this.room = stayInterface.room;
    this.roomPrice = stayInterface.roomPrice;
    this.reason = stayInterface.reason;
    this.user = stayInterface.user;
    this.customers = stayInterface.customers;
    this.consumptions = stayInterface.consumptions;
    this.payments = stayInterface.payments;
  }
}

export interface StayInterface {
  id: number;
  status: 'ACTIVE' | 'PENDING' | 'FINISHED';
  checkIn?: Date;
  checkOut?: Date;
  entryDate: Date;
  outDate: Date;
  totalPayments?: number;
  totalConsumptions?: number;
  totalRemaining?: number;
  pricePerDay?: number;
  totalGuest: number;
  totalToPay?: number;
  createdAt?: number;
  updatedAt?: number;
  destiny?: string;
  origin?: string;

  room: Room;
  roomPrice: RoomPrice;
  reason?: Reason;
  user?: User;
  customers: Customer[];
  consumptions?: Consumption[];
  payments?: Payment[];
}
