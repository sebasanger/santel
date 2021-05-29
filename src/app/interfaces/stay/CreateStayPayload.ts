import { Customer } from 'src/app/models/customer.model';

export interface CreateStayPayload {
  customers: Customer[];
  roomId: number;
  paymentMethodId: number;
  reasonId: number;
  roomPriceId: number;
  totalGuest: number;
  pricePerDay: number;
  paid: number;
  entryDate: Date;
  outDate: Date;
  active: boolean;
  checkIn: Date;
  checkOut: Date;
}
