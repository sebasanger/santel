import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewConsumptionPayload } from 'src/app/interfaces/consumptions/add-new-consumption-payload';
import { Brand } from 'src/app/models/brand.model';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Product } from 'src/app/models/product.model';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import { ProductService } from 'src/app/services/EntityServices/product.service';
import Swal from 'sweetalert2';

export interface DialogData {
  stayId: number;
}

@Component({
  selector: 'app-add-consumption',
  templateUrl: './add-consumption.component.html',
  styleUrls: ['./add-consumption.component.scss'],
})
export class AddConsumptionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private paymentMethodService: PaymentMethodService,
    private consumptionService: ConsumptionService,
    public dialogRef: MatDialogRef<AddConsumptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  private stayId: number;
  products$: Observable<Product[]>;
  paymentMethods$: Observable<PaymentMethod[]>;

  ngOnInit(): void {
    this.stayId = this.data.stayId;
    this.productService.getAll();
    this.paymentMethodService.getAll();

    this.products$ = this.productService.entities$;
    this.paymentMethods$ = this.paymentMethodService.entities$;
  }

  consumptionForm = this.fb.group({
    amount: [null, Validators.required],
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
        Swal.fire(
          'Success',
          'Consumption created at stay number ' + this.stayId,
          'success'
        );
      });

    this.dialogRef.close();
  }
}
