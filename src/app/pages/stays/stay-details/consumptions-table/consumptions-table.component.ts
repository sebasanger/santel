import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Consumption } from 'src/app/models/consuption.model';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumptions-table',
  templateUrl: './consumptions-table.component.html',
  styleUrls: ['./consumptions-table.component.scss'],
})
export class ConsumptionsTableComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<Consumption>;
  private selectedConsumptions$: Observable<Consumption[]>;
  private subscription: Subscription = new Subscription();
  private stayId: number;
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private consumptionService: ConsumptionService,
    private stayService: StayService
  ) {
    this.selectedConsumptions$ = consumptionService.stayConsumptions$;
  }

  ngOnInit(): void {
    const sub = this.route.params.subscribe((params) => {
      this.stayId = params['id'];
    });
    const suscription = this.selectedConsumptions$.subscribe(
      (res: Consumption[]) => {
        this.dataSource = new MatTableDataSource(res);
      }
    );

    this.subscription.add(suscription);
    this.subscription.add(sub);
  }

  displayedColumns: string[] = [
    'product',
    'amount',
    'price',
    'total',
    'user',
    'createdAt',
    'delete',
  ];

  delete(consumption: Consumption) {
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
        this.consumptionService.delete(consumption.id);
        setTimeout(() => {
          this.stayService.getStayByKey(this.stayId);
        }, 500);
      } else {
        Swal.fire('Cancelled', 'The consumption is safe', 'success');
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
