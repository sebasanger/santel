import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CloseRegisterPayload } from 'src/app/interfaces/registers/closer-register-payload';
import { Store } from '@ngrx/store';
import { apiCloseRegister } from 'src/app/store/register/register.api.actions';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-close-register',
  templateUrl: './close-register.component.html',
  styleUrls: ['./close-register.component.scss'],
})
export class CloseRegisterComponent implements OnInit {
  private activeRegister: Register;
  constructor(
    private fb: FormBuilder,
    private registerStore: Store<{ register: any }>,
    public dialogRef: MatDialogRef<CloseRegisterComponent>,
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerService.activeRegister$.subscribe((res) => {
      if (res != null) {
        this.activeRegister = res;
      }
    });
  }

  closeForm = this.fb.group({
    closeMount: [null, Validators.required],
  });

  onSubmit() {
    if (this.closeForm.invalid) {
      return;
    }
    const closeRegisterPayload: CloseRegisterPayload = {
      closeMount: this.closeForm.get('closeMount').value,
    };

    this.registerStore.dispatch(apiCloseRegister({ closeRegisterPayload }));

    this.dialogRef.close();
  }

  viewOpenRegisterDetails() {
    this.router.navigateByUrl(
      'pages/registers/details/' + this.activeRegister.id
    );

    this.dialogRef.close();
  }
}
