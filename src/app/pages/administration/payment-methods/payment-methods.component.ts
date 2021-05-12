import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import Swal from 'sweetalert2';
import { CreateEditPaymentMethodComponent } from './create-edit-payment-method/create-edit-payment-method.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'method',
    'description',
    'amountOfPayments',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<PaymentMethod>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  errors$: Observable<any>;
  paymentMethods$: Observable<PaymentMethod[]>;

  constructor(
    private paymentMethodService: PaymentMethodService,
    public dialog: MatDialog
  ) {
    this.paymentMethods$ = paymentMethodService.entities$;
    this.loading$ = paymentMethodService.loading$;
    this.errors$ = paymentMethodService.errors$;

    this.getPaymentMethods();

    let registers$ = this.paymentMethods$.subscribe((res: PaymentMethod[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.subscription.add(registers$);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(
    title: string,
    id?: number,
    method?: string,
    amountOfPayments?: number,
    description?: string
  ): void {
    this.dialog.open(CreateEditPaymentMethodComponent, {
      width: '500px',
      height: '600px',
      data: { id, method, amountOfPayments, description, title },
    });
  }

  delete(paymentMethod: PaymentMethod) {
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
        this.paymentMethodService.delete(paymentMethod.id);
      } else {
        Swal.fire('Cancelled', 'The payment method is safe', 'success');
      }
    });
  }

  getPaymentMethods() {
    this.paymentMethodService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
