import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GetPaginatedRegisters } from 'src/app/interfaces/registers/get-paginated-registers';
import { Register } from 'src/app/models/register.model';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import Swal from 'sweetalert2';
import { CloseRegisterComponent } from '../close-register/close-register.component';
import { CreateUpdateRegisterComponent } from '../create-update-register/create-update-register.component';
@Component({
  selector: 'app-view-registers',
  templateUrl: './view-registers.component.html',
  styleUrls: ['./view-registers.component.scss'],
})
export class ViewRegistersComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  public paginatedRegisters$ = this.registerService.paginatedRegisters$;
  public paginatedRegisters: GetPaginatedRegisters;
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
    'balance',
    'createdAt',
    'closeTime',
    'openMount',
    'closeMount',
    'active',
    'user',
    'close',
    'edit',
    'delete',
  ];

  ngOnInit() {
    const suscription = this.paginatedRegisters$.subscribe(
      (res: GetPaginatedRegisters) => {
        if (res != null && res.content.length > 0) {
          this.dataSource = new MatTableDataSource(res.content);
          this.totalElements = res.totalElements;
        }
      }
    );

    this.subscription.add(suscription);
  }

  ngAfterViewInit() {
    this.loadRegisterPage();

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
        .pipe(tap(() => this.loadRegisterPage()))
        .subscribe()
    );
  }

  loadRegisterPage() {
    this.registerService.getPaginatedRegisters(
      this.filter.toLocaleLowerCase(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public retry(): void {
    this.loadRegisterPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteRegister(id: number) {
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
        this.registerService.delete(id);
        setTimeout(() => {
          this.loadRegisterPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the register is safe', 'warning');
      }
    });
  }

  closeRegister(id: number) {
    const dialogRef = this.dialog.open(CloseRegisterComponent, {
      width: '600px',
      height: '400px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadRegisterPage();
    });
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/registers/details/' + row.id);
  }

  openDialog(id?: number, openMount?: number): void {
    this.dialog.open(CreateUpdateRegisterComponent, {
      width: '600px',
      height: '400px',
      data: { id, openMount },
    });
  }
}
