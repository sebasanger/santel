import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewConsumptionPayload } from 'src/app/interfaces/consumptions/add-new-consumption-payload';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Product } from 'src/app/models/product.model';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import { ProductService } from 'src/app/services/EntityServices/product.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

export interface DialogData {
  stayId: number;
  remaining: number;
}

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.scss'],
})
export class AddConsumptionComponent implements OnInit {
  constructor(
    private stayService: StayService,
    private fb: FormBuilder,
    private productService: ProductService,
    private paymentMethodService: PaymentMethodService,
    private consumptionService: ConsumptionService,
    public dialogRef: MatDialogRef<AddConsumptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  private stayId: number;
  public totalToPay: number = 0;
  public amount: number = 1;
  public productPrice: number = 0;
  public stayRemining: number = 0;
  public paid: number = 0;
  public consumptionReamining: number = 0;
  public actualStayRemaining: number;
  public productStock: number = 0;
  products$: Observable<Product[]>;
  paymentMethods$: Observable<PaymentMethod[]>;

  ngOnInit(): void {
    this.stayId = this.data.stayId;
    this.productService.getAll();
    this.paymentMethodService.getAll();
    this.products$ = this.productService.entities$;
    this.paymentMethods$ = this.paymentMethodService.entities$;
    console.log(this.data.remaining);

    this.actualStayRemaining = this.data.remaining;
    this.consumptionForm.get('amount').valueChanges.subscribe((res: number) => {
      this.amount = res;
      this.setTotalToPay();
    });

    this.consumptionForm.get('paid').valueChanges.subscribe((res: number) => {
      this.paid = res;
      this.setTotalToPay();
    });
  }

  setProduct(product: Product) {
    this.productPrice = product.price;
    this.productStock = product.stock;
    this.setTotalToPay();
  }

  private setTotalToPay() {
    this.totalToPay = this.amount * this.productPrice;

    this.consumptionReamining = this.totalToPay - this.paid;

    this.stayRemining = this.actualStayRemaining + this.totalToPay - this.paid;
  }

  consumptionForm = this.fb.group({
    amount: [1, Validators.required],
    paid: [null],
    paymentMethod: [null],
    product: [null, Validators.required],
  });

  onSubmit() {
    if (this.consumptionForm.invalid) {
      return;
    }

    const { amount, paid, paymentMethod, product } = this.consumptionForm.value;
    const createConsumptionPayload: AddNewConsumptionPayload = {
      amount: amount,
      paid: paid,
      paymentMethodId: paymentMethod,
      productId: product,
      stayId: this.stayId,
    };

    this.consumptionService
      .createConsumption(createConsumptionPayload)
      .subscribe((res) => {
        setTimeout(() => {
          this.stayService.getStayByKey(this.stayId);
        }, 500);
        Swal.fire(
          'Success',
          'Consumption created at stay number ' + this.stayId,
          'success'
        );
      });

    this.dialogRef.close();
  }
}
