import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { selectSelectedCustomers } from 'src/app/store/stay/stay.selectors';
import { Customer } from 'src/app/models/customer.model';
import { removeSelectCustomer } from 'src/app/store/stay/stay.actions';
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
  public displayedColumns = ['name', 'dni', 'delete'];

  ngOnInit(): void {
    this.stayStore.select(selectSelectedCustomers).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
    });
  }

  deleteCustomer(dni: string) {
    this.stayStore.dispatch(removeSelectCustomer({ dni: dni }));
  }
}
