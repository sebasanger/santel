import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddNewPaymentPayload } from 'src/app/interfaces/payments/add-new-payment-payload';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

export interface DialogData {
  stayId: number;
}

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
})
export class AddPaymentComponent implements OnInit {
  constructor(
    private stayService: StayService,
    private fb: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<AddPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  private stayId: number;
  paymentMethods$: Observable<PaymentMethod[]>;

  ngOnInit(): void {
    this.stayId = this.data.stayId;
    this.paymentMethodService.getAll();

    this.paymentMethods$ = this.paymentMethodService.entities$;
  }

  consumptionForm = this.fb.group({
    amount: [null, Validators.required],
    paymentMethod: [null, Validators.required],
  });

  onSubmit() {
    if (this.consumptionForm.invalid) {
      return;
    }
    const { amount, paymentMethod } = this.consumptionForm.value;
    const createPaymentPayload: AddNewPaymentPayload = {
      amount: amount,
      paymentMethodId: paymentMethod,
      stayId: this.stayId,
    };

    this.paymentService.createPayment(createPaymentPayload).subscribe((res) => {
      setTimeout(() => {
        this.stayService.getStayByKey(this.stayId);
      }, 500);
      Swal.fire(
        'Success',
        'Payment created at stay number ' + this.stayId,
        'success'
      );
    });

    this.dialogRef.close();
  }
}
