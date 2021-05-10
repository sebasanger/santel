import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from 'src/app/models/inovice.model';
import { InvoiceService } from 'src/app/services/EntityServices/invoice.service';

export interface DialogData {
  id?: number;
  type?: string;
  title: string;
}

@Component({
  selector: 'app-create-edit-inovice',
  templateUrl: './create-edit-invoice.component.html',
  styleUrls: ['./create-edit-invoice.component.scss'],
})
export class CreateEditInvoiceComponent {
  inoviceForm = this.fb.group({
    type: [this.data.type, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private inoviceService: InvoiceService,
    public dialogRef: MatDialogRef<CreateEditInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.inoviceForm.invalid) {
      return;
    }
    const inoviceValue: string = this.inoviceForm.controls['type'].value;

    if (this.data.id != null) {
      const newInvoice = new Invoice(this.data.id, inoviceValue);
      this.update(newInvoice);
    } else {
      const newInvoice = new Invoice(null, inoviceValue);
      this.add(newInvoice);
    }
    this.dialogRef.close();
  }

  add(inovice: Invoice) {
    this.inoviceService.add(inovice);
  }
  update(inovice: Invoice) {
    this.inoviceService.update(inovice);
  }
}
