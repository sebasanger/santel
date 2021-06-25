import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GetPaginatedPayments } from 'src/app/interfaces/payments/get-paginated-payments';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.scss'],
})
export class ViewPaymentsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  constructor(private paymentService: PaymentService, private router: Router) {}

  public paginatedPayments$ = this.paymentService.paginatedPayments$;
  public paginatedPayments: GetPaginatedPayments;
  public filterSubject = new Subject<string>();
  public dataSource: MatTableDataSource<any>;
  private subscription: Subscription = new Subscription();
  public totalElements: number = 0;
  public filter: string = '';
  private startDate: string = '';
  private endDate: string = '';
  public displayedColumns = [
    'id',
    'description',
    'amount',
    'paymentMethod.type',
    'register',
    'stay',
    'createdAt',
    'user',
    'delete',
  ];

  ngOnInit() {
    const suscription = this.paginatedPayments$.subscribe(
      (res: GetPaginatedPayments) => {
        if (res != null && res.content.length > 0) {
          this.dataSource = new MatTableDataSource(res.content);
          this.totalElements = res.totalElements;
          console.log(res);
        }
      }
    );

    const sus = this.range.valueChanges.subscribe((res) => {
      if (res.start != null && res.end != null) {
        this.startDate = res.start.toISOString().slice(0, 10) + ' 00:00';
        this.endDate = res.end.toISOString().slice(0, 10) + ' 00:00';
        this.loadPaymentPage();
      }
    });

    this.subscription.add(suscription);

    this.subscription.add(sus);
  }

  ngAfterViewInit() {
    this.loadPaymentPage();

    let filter$ = this.filterSubject.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((value: string) => {
        this.paginator.pageIndex = 0;
        this.filter = value;
      })
    );

    let sort$ = this.sort.sortChange.pipe(
      tap(() => (this.paginator.pageIndex = 0))
    );

    this.subscription.add(
      merge(filter$, sort$, this.paginator.page)
        .pipe(tap(() => this.loadPaymentPage()))
        .subscribe()
    );
  }

  loadPaymentPage() {
    this.paymentService.getPaginatedPayments(
      this.filter.toLocaleLowerCase(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.startDate,
      this.endDate
    );
  }

  public retry(): void {
    this.loadPaymentPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deletePayment(id: number) {
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
        this.paymentService.delete(id);
        setTimeout(() => {
          this.loadPaymentPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the payment is safe', 'warning');
      }
    });
  }

  stayDetails(id: number) {
    this.router.navigateByUrl('pages/stays/details/' + id);
  }

  registerDetails(id: number) {
    this.router.navigateByUrl('pages/registers/details/' + id);
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/payments/details/' + row.id);
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
