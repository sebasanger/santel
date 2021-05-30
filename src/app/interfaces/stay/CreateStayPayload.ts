import { Customer } from 'src/app/models/customer.model';

export interface CreateStayPayload {
  customers: Customer[];
  roomId: number;
  paymentMethodId?: number;
  reasonId?: number;
  roomPriceId: number;
  totalGuest: number;
  paid?: number;
  entryDate: String;
  outDate: String;
  active?: boolean;
  checkIn?: Date;
  checkOut?: Date;
}
