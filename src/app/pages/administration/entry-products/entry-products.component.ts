import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { EntryProduct } from 'src/app/models/entry-product.model';
import { EntryProductService } from 'src/app/services/EntityServices/entry-product.service';
import Swal from 'sweetalert2';
import { CreateUpdateEntryProductComponent } from './create-update-entry-product/create-update-entry-product.component';

@Component({
  selector: 'app-entry-products',
  templateUrl: './entry-products.component.html',
  styleUrls: ['./entry-products.component.scss'],
})
export class EntryProductsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'product',
    'amount',
    'buyPrice',
    'user',
    'createdAt',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<EntryProduct>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  entryProducts$: Observable<EntryProduct[]>;

  constructor(
    private entryProductService: EntryProductService,
    public dialog: MatDialog
  ) {
    this.entryProducts$ = entryProductService.entities$;
    this.loading$ = entryProductService.loading$;

    this.getEntryProducts();

    let registers$ = this.entryProducts$.subscribe((res: EntryProduct[]) => {
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
    id?: number,
    amount?: number,
    productId?: number,
    buyPrice?: number,
    createdAt?: Date,
    userId?: number
  ): void {
    this.dialog.open(CreateUpdateEntryProductComponent, {
      width: '600px',
      height: '700px',
      data: { id, amount, productId, buyPrice, createdAt, userId },
    });
  }

  delete(entryProduct: EntryProduct) {
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
        this.entryProductService.delete(entryProduct.id);
      } else {
        Swal.fire('Cancelled', 'The entryProduct type is safe', 'success');
      }
    });
  }

  getEntryProducts() {
    this.entryProductService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
