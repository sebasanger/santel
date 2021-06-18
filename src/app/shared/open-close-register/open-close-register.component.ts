import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { CloseRegisterComponent } from 'src/app/pages/registers/close-register/close-register.component';
import { CreateUpdateRegisterComponent } from 'src/app/pages/registers/create-update-register/create-update-register.component';
import { RegisterService } from 'src/app/services/EntityServices/register.service';

@Component({
  selector: 'app-open-close-register',
  templateUrl: './open-close-register.component.html',
  styleUrls: ['./open-close-register.component.scss'],
})
export class OpenCloseRegisterComponent implements OnInit {
  public activeRegister$: Observable<Register>;
  public register: Register;
  constructor(
    public dialog: MatDialog,
    public registerService: RegisterService
  ) {
    this.activeRegister$ = registerService.activeRegister$;
  }

  ngOnInit(): void {
    this.registerService.selectActiveRegister();
  }

  closeRegister() {
    this.dialog.open(CloseRegisterComponent, {
      width: '600px',
      height: '500px',
    });
  }

  openRegister(id?: number, openMount?: number): void {
    this.dialog.open(CreateUpdateRegisterComponent, {
      width: '600px',
      height: '500px',
      data: { id, openMount },
    });
  }
}
