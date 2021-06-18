import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Reason } from 'src/app/models/reason.model';
import { ReasonService } from 'src/app/services/EntityServices/reason.service';
import Swal from 'sweetalert2';
import { CreateEditReasonComponent } from './create-edit-reason/create-edit-reason.component';

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss'],
})
export class ReasonsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'reason', 'edit', 'delete'];
  public dataSource: MatTableDataSource<Reason>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  errors$: Observable<any>;
  reasons$: Observable<Reason[]>;

  constructor(private reasonService: ReasonService, public dialog: MatDialog) {
    this.reasons$ = reasonService.entities$;
    this.loading$ = reasonService.loading$;
    this.errors$ = reasonService.errors$;

    this.getReasons();

    let registers$ = this.reasons$.subscribe((res: Reason[]) => {
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

  openDialog(id?: number, reason?: string): void {
    this.dialog.open(CreateEditReasonComponent, {
      width: '500px',
      height: '600px',
      data: { id: id, reason: reason },
    });
  }

  delete(reason: Reason) {
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
        this.reasonService.delete(reason.id);
      } else {
        Swal.fire('Cancelled', 'The reason is safe', 'success');
      }
    });
  }

  getReasons() {
    this.reasonService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
