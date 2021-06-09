import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Stay } from 'src/app/models/stay.model';
import { AddConsumptionComponent } from 'src/app/pages/consumptions/add-consumption/add-consumption.component';
import { AddPaymentComponent } from 'src/app/pages/payments/add-payment/add-payment.component';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stay-table',
  templateUrl: './stay-table.component.html',
  styleUrls: ['./stay-table.component.scss'],
})
export class StayTableComponent implements OnInit {
  @Input() public stay: Stay;
  constructor(
    private router: Router,
    private stayService: StayService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  editStay(userid: number) {
    this.router.navigateByUrl('pages/stays/update/' + userid);
  }
  addPayment(stayId: number) {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '800px',
      height: '600px',
      data: { stayId },
    });
  }

  addConsumption(stayId: number): void {
    const dialogRef = this.dialog.open(AddConsumptionComponent, {
      width: '800px',
      height: '600px',
      data: { stayId },
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
