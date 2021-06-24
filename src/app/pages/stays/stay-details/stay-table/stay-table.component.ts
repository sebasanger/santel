import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Register } from 'src/app/models/register.model';
import { Stay } from 'src/app/models/stay.model';
import { AddConsumptionComponent } from 'src/app/pages/consumptions/add-consumption/add-consumption.component';
import { AddPaymentComponent } from 'src/app/pages/payments/add-payment/add-payment.component';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stay-table',
  templateUrl: './stay-table.component.html',
  styleUrls: ['./stay-table.component.scss'],
})
export class StayTableComponent implements OnInit {
  @Input() public stay: Stay;
  public registerActive$: Observable<Register>;

  constructor(
    private router: Router,
    private stayService: StayService,
    public dialog: MatDialog,
    private registerSerivce: RegisterService
  ) {
    this.registerActive$ = this.registerSerivce.activeRegister$;
  }

  ngOnInit(): void {}

  editStay(userid: number) {
    this.router.navigateByUrl('pages/stays/update/' + userid);
  }
  addPayment(stayId: number) {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '900px',
      height: '700px',
      data: {
        stayId,
        remaining: this.stay.totalRemaining,
      },
    });
  }

  addConsumption(stayId: number): void {
    const dialogRef = this.dialog.open(AddConsumptionComponent, {
      width: '900px',
      height: '700px',
      data: { stayId, remaining: this.stay.totalRemaining },
    });
  }

  finishStay(stayid: number) {
    Swal.fire({
      title: 'Finish stay?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, finish!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.stayService.finishStay(stayid).subscribe(
          (res) => {
            //this.loadStayPage();
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'The stay is still active', 'info');
      }
    });
  }

  deleteStay(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.stayService.delete(id);

        this.router.navigateByUrl('pages/users');
      } else {
        Swal.fire('Cancelled', 'the stay is safe', 'error');
      }
    });
  }
}
