import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/EntityServices/product.service';
import Swal from 'sweetalert2';
import { CreateUpdateProductComponent } from '../create-update-product/create-update-product.component';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss'],
})
export class ViewProductsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'id',
    'name',
    'stock',
    'price',
    'category',
    'brand',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<Product>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {
    this.products$ = productService.entities$;
    this.loading$ = productService.loading$;

    this.getProducts();

    let registers$ = this.products$.subscribe((res: Product[]) => {
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
    name?: string,
    stock?: number,
    price?: number,
    category?: Category,
    brand?: Brand
  ): void {
    const dialogRef = this.dialog.open(CreateUpdateProductComponent, {
      width: '600px',
      height: '800px',
      data: { title, id, name, stock, price, category, brand },
    });
  }

  delete(product: Product) {
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
        this.productService.delete(product.id);
      } else {
        Swal.fire('Cancelled', 'The product is safe', 'success');
      }
    });
  }

  getProducts() {
    this.productService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
