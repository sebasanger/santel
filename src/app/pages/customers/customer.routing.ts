import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewCustomersComponent } from './view-customers/view-customers.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CreateUpdateCustomerComponent } from './create-update-customer/create-update-customer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewCustomersComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateUpdateCustomerComponent,
      },
      {
        path: 'update/:id',
        component: CreateUpdateCustomerComponent,
      },
      {
        path: 'details/:id',
        component: CustomerDetailsComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CustomerRouting {}
