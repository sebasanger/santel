import { Customer } from 'src/app/models/customer.model';

export interface CreateUpdateStayPayload {
  id?: number;
  customers: Customer[];
  roomId: number;
  paymentMethodId?: number;
  reasonId?: number;
  roomPriceId: number;
  totalGuest: number;
  destiny?: string;
  origin?: string;
  paid?: number;
  entryDate: String;
  outDate: String;
  active?: boolean;
  checkIn?: Date;
  checkOut?: Date;
}
