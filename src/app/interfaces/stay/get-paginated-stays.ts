export interface GetPaginatedStays {
  content: [
    {
      id: number;
      room: string;
      totalGuest: number;
      checkIn: Date;
      checkOut: Date;
      entryDate: Date;
      outDate: Date;
      active: Boolean;
      reason: string;
      price: number;
      pricePerDay: number;
      paid: number;
      totalToPay: number;
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
