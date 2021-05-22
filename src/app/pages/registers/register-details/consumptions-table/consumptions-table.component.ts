import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Consumption } from 'src/app/models/consuption.model';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumptions-table',
  templateUrl: './consumptions-table.component.html',
  styleUrls: ['./consumptions-table.component.scss'],
})
export class ConsumptionsTableComponent implements OnInit {
  @Input() consumptions: Consumption[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Consumption>;

  displayedColumns: string[] = [
    'amount',
    'price',
    'product',
    'method',
    'user',
    'delete',
  ];

  constructor(
    public dialog: MatDialog,
    private consumptionService: ConsumptionService
  ) {}
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.consumptions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
      } else {
        Swal.fire('Cancelled', 'The consumption is safe', 'success');
      }
    });
  }
}
