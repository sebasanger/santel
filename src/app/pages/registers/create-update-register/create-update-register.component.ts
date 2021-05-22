import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import { Register, RegisterInterface } from 'src/app/models/register.model';
export interface DialogData {
  title: string;
  id?: number;
  openMount?: number;
}
@Component({
  selector: 'app-create-update-register',
  templateUrl: './create-update-register.component.html',
  styleUrls: ['./create-update-register.component.scss'],
})
export class CreateUpdateRegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    public dialogRef: MatDialogRef<CreateUpdateRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  registerForm = this.fb.group({
    openMount: [this.data.openMount, Validators.required],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    const registerInterface: RegisterInterface = {
      openMount: this.registerForm.get('openMount').value,
    };

    const register: Register = new Register(registerInterface);

    if (this.data.id != null) {
      this.registerService.update(register);
    } else {
      this.registerService.add(register);
    }
    this.dialogRef.close();
  }
}
