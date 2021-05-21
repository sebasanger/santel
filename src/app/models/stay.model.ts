import { Customer } from './customer.model';
import { Reason } from './reason.model';
import { Consumption } from './consuption.model';
import { RoomPrice } from './room-price.model';
import { Room } from './room.model';
import { User } from './user.model';
import { Payment } from './payment.model';

export class Stay {
  public id: number;
  public active: boolean;
  public checkIn: Date;
  public checkOut: Date;
  public entryDate: Date;
  public outDate: Date;
  public paid: number;
  public pricePerDay: number;
  public totalGuest: number;
  public totalToPay: number;
  public createdAt: number;
  public updatedAt: number;

  public room: Room;
  public roomPrice: RoomPrice;
  public reason: Reason;
  public user: User;
  public customers: Customer[];
  public consumptions: Consumption[];
  public payments: Payment[];

  constructor(stayInterface: StayInterface) {
    this.id = stayInterface.id;
    this.active = stayInterface.active;
    this.checkIn = stayInterface.checkIn;
    this.checkOut = stayInterface.checkOut;
    this.entryDate = stayInterface.entryDate;
    this.outDate = stayInterface.outDate;
    this.paid = stayInterface.paid;
    this.pricePerDay = stayInterface.pricePerDay;
    this.totalGuest = stayInterface.totalGuest;
    this.totalToPay = stayInterface.totalToPay;
    this.createdAt = stayInterface.createdAt;
    this.updatedAt = stayInterface.updatedAt;

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
  active: boolean;
  checkIn: Date;
  checkOut: Date;
  entryDate: Date;
  outDate: Date;
  paid: number;
  pricePerDay: number;
  totalGuest: number;
  totalToPay: number;
  createdAt: number;
  updatedAt: number;

  room: Room;
  roomPrice: RoomPrice;
  reason?: Reason;
  user: User;
  customers: Customer[];
  consumptions?: Consumption[];
  payments?: Payment[];
}
