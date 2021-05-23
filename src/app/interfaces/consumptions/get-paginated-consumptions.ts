export interface GetPaginatedConsumptions {
  content: [
    {
      id: number;
      product: String;
      amount: number;
      price: number;
      paymentMethod: String;
      register: number;
      stay: number;
      user: String;
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
