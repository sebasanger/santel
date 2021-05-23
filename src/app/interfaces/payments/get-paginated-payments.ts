import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Register } from 'src/app/models/register.model';
import { Stay } from 'src/app/models/stay.model';
import { User } from 'src/app/models/user.model';

export interface GetPaginatedPayments {
  content: [
    {
      id: number;
      amount: number;
      paymentMethod: PaymentMethod;
      register: Register;
      stay: Stay;
      user: User;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  pageable: {
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: { sorted: boolean; empty: boolean };
  };
  size: number;
  totalElements: number;
  totalPages: number;
}
