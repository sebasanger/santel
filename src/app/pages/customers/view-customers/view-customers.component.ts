import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCustomersPaginated } from 'src/app/store/customer/customer.api.actions';

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss'],
})
export class ViewCustomersComponent implements OnInit {
  constructor(private customerStore: Store<{ customer: any }>) {}

  ngOnInit(): void {
    this.customerStore.dispatch(
      getCustomersPaginated({
        filter: '',
        pageIndex: 1,
        pageSize: 5,
        sortDirection: 'asc',
        sort: 'id',
      })
    );
    this.customerStore.select('customer').subscribe((res) => {
      console.log(res);
    });
  }
}
