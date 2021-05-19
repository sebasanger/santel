import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/models/customer.model';
@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss'],
})
export class ViewCustomersComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  public paginatedCustomers$ = this.customerService.paginatedCustomers$;
  public paginatedCustomers: GetPaginatedCustomers;
  public filterSubject = new Subject<string>();
  public loading: boolean;
  public error$: Observable<boolean>;
  public defaultSort: Sort = { active: 'id', direction: 'asc' };
  public dataSource: MatTableDataSource<any>;
  private subscription: Subscription = new Subscription();
  public totalElements: number = 0;
  public filter: string = '';
  public displayedColumns = [
    'id',
    'name',
    'email',
    'birthday',
    'dni',
    'edit',
    'delete',
  ];

  ngOnInit() {
    const suscription = this.paginatedCustomers$.subscribe(
      (res: GetPaginatedCustomers) => {
        if (res != null && res.content.length > 0) {
          this.dataSource = new MatTableDataSource(res.content);
          this.totalElements = res.totalElements;
        }
      }
    );

    this.subscription.add(suscription);
  }

  ngAfterViewInit() {
    this.loadCustomerPage();

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
        .pipe(tap(() => this.loadCustomerPage()))
        .subscribe()
    );
  }

  loadCustomerPage() {
    this.customerService.getPaginatedCustomers(
      this.filter.toLocaleLowerCase(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public retry(): void {
    this.loadCustomerPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewCustomer() {
    this.router.navigateByUrl('pages/customers/create');
  }

  editCustomer(userid: number) {
    this.router.navigateByUrl('pages/customers/update/' + userid);
  }

  deleteCustomer(id: number) {
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
        this.customerService.delete(id);
        setTimeout(() => {
          this.loadCustomerPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the customer is safe', 'warning');
      }
    });
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/customers/details/' + row.id);
  }
}
