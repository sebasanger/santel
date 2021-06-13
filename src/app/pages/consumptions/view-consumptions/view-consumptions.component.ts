import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { GetPaginatedConsumptions } from 'src/app/interfaces/consumptions/get-paginated-consumptions';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-consumptions',
  templateUrl: './view-consumptions.component.html',
  styleUrls: ['./view-consumptions.component.scss'],
})
export class ViewConsumptionsComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  constructor(
    private consumptionService: ConsumptionService,
    private router: Router
  ) {}

  public paginatedConsumptions$ =
    this.consumptionService.paginatedConsumptions$;
  public paginatedConsumptions: GetPaginatedConsumptions;
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
    'product',
    'amount',
    'price',
    'paid',
    'stay',
    'user',
    'delete',
  ];

  ngOnInit() {
    const suscription = this.paginatedConsumptions$.subscribe(
      (res: GetPaginatedConsumptions) => {
        if (res != null && res.content.length > 0) {
          this.dataSource = new MatTableDataSource(res.content);
          this.totalElements = res.totalElements;
        }
      }
    );

    this.subscription.add(suscription);
  }

  ngAfterViewInit() {
    this.loadConsumptionPage();

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
        .pipe(tap(() => this.loadConsumptionPage()))
        .subscribe()
    );
  }

  loadConsumptionPage() {
    this.consumptionService.getPaginatedConsumptions(
      this.filter.toLocaleLowerCase(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }

  public retry(): void {
    this.loadConsumptionPage();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteConsumption(id: number) {
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
        this.consumptionService.delete(id);
        setTimeout(() => {
          this.loadConsumptionPage();
        }, 500);
      } else {
        Swal.fire('Cancelled', 'the consumption is safe', 'warning');
      }
    });
  }

  onRowClicked(row: any) {
    this.router.navigateByUrl('pages/consumptions/details/' + row.id);
  }
}
