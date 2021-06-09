import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit, OnDestroy {
  @Input() payments: Payment[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Payment>;
  private selectedPayments$: Observable<Payment[]>;
  private stayId: number;
  private subscription: Subscription = new Subscription();
  displayedColumns: string[] = [
    'description',
    'amount',
    'method',
    'user',
    'createdAt',
    'delete',
  ];

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private paymentService: PaymentService,
    private stayService: StayService
  ) {
    this.selectedPayments$ = paymentService.selectedPayments$;
  }
  ngOnInit(): void {
    const sub = this.route.params.subscribe((params) => {
      this.stayId = params['id'];
    });
    const suscription = this.selectedPayments$.subscribe((res: Payment[]) => {
      this.dataSource = new MatTableDataSource(res);
    });

    this.subscription.add(suscription);
    this.subscription.add(sub);
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
        setTimeout(() => {
          this.stayService.getStayByKey(this.stayId);
        }, 500);
      } else {
        Swal.fire('Cancelled', 'The payment is safe', 'success');
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
