import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/EntityServices/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-tables',
  templateUrl: './customer-tables.component.html',
  styleUrls: ['./customer-tables.component.scss'],
})
export class CustomerTablesComponent implements OnInit {
  @Input() public customer: Customer;
  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    console.log(this.customer);
  }

  editCustomer(userid: number) {
    this.router.navigateByUrl('pages/customers/update/' + userid);
  }

  deleteCustomer(id: number) {
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
        this.customerService.delete(id);

        this.router.navigateByUrl('pages/users');
      } else {
        Swal.fire('Cancelled', 'the customer is safe', 'error');
      }
    });
  }
}
