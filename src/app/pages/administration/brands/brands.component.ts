import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Brand } from 'src/app/models/brand.model';
import { BrandService } from 'src/app/services/EntityServices/brand.service';
import Swal from 'sweetalert2';
import { CreateUpdateBrandsComponent } from './create-update-brands/create-update-brands.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'brand', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Brand>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  brands$: Observable<Brand[]>;

  constructor(private brandService: BrandService, public dialog: MatDialog) {
    this.brands$ = brandService.entities$;
    this.loading$ = brandService.loading$;

    this.getBrands();

    let registers$ = this.brands$.subscribe((res: Brand[]) => {
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

  openDialog(id?: number, brand?: string): void {
    const dialogRef = this.dialog.open(CreateUpdateBrandsComponent, {
      width: '600px',
      height: '500px',
      data: { id: id, brand: brand },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  delete(brand: Brand) {
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
        this.brandService.delete(brand.id);
      } else {
        Swal.fire('Cancelled', 'The brand is safe', 'success');
      }
    });
  }

  getBrands() {
    this.brandService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
