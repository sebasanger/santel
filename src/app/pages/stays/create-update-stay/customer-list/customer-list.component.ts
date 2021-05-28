import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GetPaginatedCustomers } from 'src/app/interfaces/customers/get-paginated-customers';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSelectedCustomers } from 'src/app/store/stay/stay.selectors';
import { Customer } from 'src/app/models/customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private stayStore: Store<{ stay: any }>) {}

  public defaultSort: Sort = { active: 'id', direction: 'asc' };
  public dataSource: MatTableDataSource<Customer>;
  public displayedColumns = ['name', 'dni', 'edit', 'delete'];

  ngOnInit(): void {
    this.stayStore.select(selectSelectedCustomers).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  editCustomer(id: number) {}

  deleteCustomer(id: number) {}
}
