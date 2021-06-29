import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Stay } from 'src/app/models/stay.model';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stays-table',
  templateUrl: './stays-table.component.html',
  styleUrls: ['./stays-table.component.scss'],
})
export class StaysTableComponent implements OnInit {
  @Input() id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Stay>;

  displayedColumns: string[] = [
    'id',
    'totalPayments',
    'totalToPay',
    'totalGuest',
    'entryDate',
    'outDate',
  ];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    if (this.id > 0) {
      this.customerService.getCustomerStays(this.id).subscribe((res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  stayDetails(id: number) {
    this.router.navigateByUrl('pages/stays/details/' + id);
  }
}
