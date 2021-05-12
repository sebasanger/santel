export interface GetPaginatedCustomers {
  content: [
    {
      id: number;
      name: string;
      surname: string;
      email: string;
      dni: string;
      brithday: Date;
      cuil: string;
      cuit: string;
      phone: string;
      telephone: string;
      invoiceType: {
        type: string;
      };
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
