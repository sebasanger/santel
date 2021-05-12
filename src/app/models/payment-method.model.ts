export class PaymentMethod {
  constructor(
    public id: number,
    public method: string,
    public description: string,
    public amountOfPayments: number
  ) {}
}
