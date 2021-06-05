export interface GetPaginatedPayments {
  content: [
    {
      id: number;
      amount: number;
      description: string;
      paymentMethod: string;
      register: number;
      stay: number;
      user: string;
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
