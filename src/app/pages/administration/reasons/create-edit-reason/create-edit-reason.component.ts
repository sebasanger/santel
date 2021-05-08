import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reason } from 'src/app/models/reason.model';
import { ReasonService } from 'src/app/services/EntityServices/reason.service';
import Swal from 'sweetalert2';

export interface DialogData {
  id?: number;
  reason?: string;
  title: string;
}

@Component({
  selector: 'app-create-edit-reason',
  templateUrl: './create-edit-reason.component.html',
  styleUrls: ['./create-edit-reason.component.scss'],
})
export class CreateEditReasonComponent {
  reasonForm = this.fb.group({
    reason: [this.data.reason, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private reasonService: ReasonService,
    public dialogRef: MatDialogRef<CreateEditReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.reasonForm.invalid) {
      return;
    }
    const reasonValue: string = this.reasonForm.controls['reason'].value;

    if (this.data.id != null) {
      const newReason = new Reason(this.data.id, reasonValue);
      this.update(newReason);
      Swal.fire('Updated', 'Reason now is ' + reasonValue, 'success');
    } else {
      const newReason = new Reason(null, reasonValue);
      this.add(newReason);
      Swal.fire('Added', 'Reason ' + reasonValue + ' added', 'success');
    }
    this.dialogRef.close();
  }

  add(reason: Reason) {
    this.reasonService.add(reason);
  }
  update(reason: Reason) {
    this.reasonService.update(reason);
  }
}
