import { User } from 'src/app/models/user.model';

export interface GetPaginatedCustomers {
  content: [
    {
      id: number;
      active: boolean;
      balance: number;
      closeMount: number;
      openMount: number;
      closeTime: Date;
      createdAt: Date;
      updatedAt: Date;
      user: User;
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
