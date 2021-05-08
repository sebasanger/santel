import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/EntityServices/category.service';
import Swal from 'sweetalert2';
import { CreateEditCategoriesComponent } from './create-edit-categories/create-edit-categories.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'category', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Category>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  categories$: Observable<Category[]>;

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) {
    this.categories$ = categoryService.entities$;
    this.loading$ = categoryService.loading$;

    this.getCategories();

    let registers$ = this.categories$.subscribe((res: Category[]) => {
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

  openDialog(title: string, id?: number, category?: string): void {
    const dialogRef = this.dialog.open(CreateEditCategoriesComponent, {
      width: '400px',
      height: '300px',
      data: { id: id, category: category, title: title },
    });
  }

  delete(category: Category) {
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
        this.categoryService.delete(category.id);
        Swal.fire('Deleted', 'The category is deleted', 'success');
      } else {
        Swal.fire('Cancelled', 'The category is safe', 'success');
      }
    });
  }

  getCategories() {
    this.categoryService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
