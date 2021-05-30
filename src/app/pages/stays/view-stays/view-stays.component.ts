import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GetPaginatedStays } from 'src/app/interfaces/stay/get-paginated-stays';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-stays',
  templateUrl: './view-stays.component.html',
  styleUrls: ['./view-stays.component.scss'],
})
export class ViewStaysComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  constructor(private stayService: StayService, private router: Router) {}

  public paginatedStay$ = this.stayService.paginatedStays$;
  public paginatedStay: GetPaginatedStays;
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
    'room',
    'totalGuest',
    'entryDate',
    'outDate',
    'active',
    'reason',
    'price',
    'pricePerDay',
    'paid',
    'totalToPay',
    'edit',
    'delete',
  ];

  ngOnInit() {
    const suscription = this.paginatedStay$.subscribe(
      (res: GetPaginatedStays) => {
        if (res != null && res.content.length > 0) {
          this.dataSource = new MatTableDataSource(res.content);
          this.totalElements = res.totalElements;
        }
      }
    );

    this.subscription.add(suscription);
  }

  ngAfterViewInit() {
    this.loadStayPage();

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
        .pipe(tap(() => this.loadStayPage()))
        .subscribe()
    );
  }

  loadStayPage() {
    this.stayService.getPaginatedStay(
      this.filter.toLocaleLowerCase(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public retry(): void {
    this.loadStayPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addNewStay() {
    this.router.navigateByUrl('pages/stays/create');
  }

  editStay(stayid: number) {
    this.router.navigateByUrl('pages/stays/update/' + stayid);
  }

  deleteStay(id: number) {
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
        this.stayService.delete(id);
        setTimeout(() => {
          this.loadStayPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the stay is safe', 'warning');
      }
    });
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/stays/details/' + row.id);
  }
}
