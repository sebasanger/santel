import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
  @Input() payments: Payment[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Payment>;

  displayedColumns: string[] = [
    'amount',
    'description',
    'method',
    'createdAt',
    'user',
    'delete',
  ];

  constructor(
    public dialog: MatDialog,
    private paymentService: PaymentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.payments);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  stayDetails(id: number) {
    this.router.navigateByUrl('pages/stays/details/' + id);
  }

  delete(payment: Payment) {
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
        this.paymentService.delete(payment.id);
      } else {
        Swal.fire('Cancelled', 'The payment is safe', 'success');
      }
    });
  }
}
