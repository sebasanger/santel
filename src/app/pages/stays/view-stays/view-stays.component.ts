import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Subject, Subscription } from 'rxjs';
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
  public filterSubject = new Subject<string>();
  public dataSource: MatTableDataSource<any>;
  private subscription: Subscription = new Subscription();
  public totalElements: number = 0;
  private startDate: string = '';
  private endDate: string = '';
  public filter: string = '';
  public statusSelected: string = 'ACTIVE';
  public displayedColumns = [
    'id',
    'room',
    'totalGuest',
    'entryDate',
    'outDate',
    'status',
    'price',
    'pricePerDay',
    'paid',
    'totalToPay',
    'finishStay',
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

    const sus = this.range.valueChanges.subscribe((res) => {
      if (res.start != null && res.end != null) {
        this.startDate = res.start.toISOString().slice(0, 10);
        this.endDate = res.end.toISOString().slice(0, 10);
        this.loadStayPage();
      }
    });

    this.subscription.add(suscription);
    this.subscription.add(sus);
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
      this.paginator.pageSize,
      this.startDate,
      this.endDate,
      this.statusSelected
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

  finishStay(stayid: number) {
    Swal.fire({
      title: 'Finish stay?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, finish!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.stayService.finishStay(stayid).subscribe(
          (res) => {
            this.loadStayPage();
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'The stay is still active', 'info');
      }
    });
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

  filterByStatus(status: string) {
    this.statusSelected = status;
    this.loadStayPage();
  }

  checkinStay(stayid: number) {
    Swal.fire({
      title: 'Check in stay?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, set check in!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.stayService.checkinStay(stayid).subscribe(
          (res) => {
            this.loadStayPage();
          },
          (err) => {
            Swal.fire('Error', err.error.message, 'error');
          }
        );
      } else {
        Swal.fire('Cancelled', 'The stay is still pending', 'info');
      }
    });
  }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
