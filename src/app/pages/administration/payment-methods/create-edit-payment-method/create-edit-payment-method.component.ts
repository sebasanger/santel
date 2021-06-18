import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';

export interface DialogData {
  id?: number;
  amountOfPayments?: string;
  method?: string;
  description?: number;
}

@Component({
  selector: 'app-create-edit-payment-method',
  templateUrl: './create-edit-payment-method.component.html',
  styleUrls: ['./create-edit-payment-method.component.scss'],
})
export class CreateEditPaymentMethodComponent {
  paymentMethodForm = this.fb.group({
    method: [this.data.method, Validators.required],
    description: [this.data.description, Validators.required],
    amountOfPayments: [this.data.amountOfPayments, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    public dialogRef: MatDialogRef<CreateEditPaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.paymentMethodForm.invalid) {
      return;
    }
    const methodValue: string = this.paymentMethodForm.controls['method'].value;
    const descriptionValue: string =
      this.paymentMethodForm.controls['description'].value;
    const amountOfPaymentsValue: number =
      this.paymentMethodForm.controls['amountOfPayments'].value;

    if (this.data.id != null) {
      const newPaymentMethod = new PaymentMethod(
        this.data.id,
        methodValue,
        descriptionValue,
        amountOfPaymentsValue
      );
      this.update(newPaymentMethod);
    } else {
      const newPaymentMethod = new PaymentMethod(
        null,
        methodValue,
        descriptionValue,
        amountOfPaymentsValue
      );
      this.add(newPaymentMethod);
    }
    this.dialogRef.close();
  }

  add(paymentMethod: PaymentMethod) {
    this.paymentMethodService.add(paymentMethod);
  }
  update(paymentMethod: PaymentMethod) {
    this.paymentMethodService.update(paymentMethod);
  }
}
