import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Invoice } from 'src/app/models/inovice.model';
import { InvoiceService } from 'src/app/services/EntityServices/invoice.service';
import Swal from 'sweetalert2';
import { CreateEditInvoiceComponent } from './create-edit-invoice/create-edit-invoice.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'type', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Invoice>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  invoices$: Observable<Invoice[]>;

  constructor(
    private invoiceService: InvoiceService,
    public dialog: MatDialog
  ) {
    this.invoices$ = invoiceService.entities$;
    this.loading$ = invoiceService.loading$;

    this.getInvoices();

    let registers$ = this.invoices$.subscribe((res: Invoice[]) => {
      console.log(res);

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

  openDialog(id?: number, type?: string): void {
    this.dialog.open(CreateEditInvoiceComponent, {
      width: '500px',
      height: '600px',
      data: { id: id, type: type },
    });
  }

  delete(invoice: Invoice) {
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
        this.invoiceService.delete(invoice.id);
      } else {
        Swal.fire('Cancelled', 'The invoice type is safe', 'success');
      }
    });
  }

  getInvoices() {
    this.invoiceService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
