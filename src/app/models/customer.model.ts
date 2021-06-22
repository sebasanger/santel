import { Invoice } from './inovice.model';
import { Stay } from './stay.model';

export class Customer {
  constructor(
    public id: number,
    public name: string,
    public surname: string,
    public dni: string,
    public birthday: Date,
    public email?: string,
    public phone?: string,
    public celphone?: string,
    public cuil?: string,
    public cuit?: string,
    public invoiceType?: Invoice,
    public note?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public stays?: Stay[]
  ) {}
}
