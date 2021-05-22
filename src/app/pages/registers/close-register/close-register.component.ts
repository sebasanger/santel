import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloseRegisterPayload } from 'src/app/interfaces/registers/closer-register-payload';
import { Store } from '@ngrx/store';
import { apiCloseRegister } from 'src/app/store/register/register.api.actions';
export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-close-register',
  templateUrl: './close-register.component.html',
  styleUrls: ['./close-register.component.scss'],
})
export class CloseRegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerStore: Store<{ register: any }>,
    public dialogRef: MatDialogRef<CloseRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  closeForm = this.fb.group({
    closeMount: [null, Validators.required],
  });

  onSubmit() {
    if (this.closeForm.invalid) {
      return;
    }
    const closeRegisterPayload: CloseRegisterPayload = {
      id: this.data.id,
      closeMount: this.closeForm.get('closeMount').value,
    };

    this.registerStore.dispatch(apiCloseRegister({ closeRegisterPayload }));

    this.dialogRef.close();
  }
}
