import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewPaymentsComponent } from './view-payments/view-payments.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewPaymentsComponent,
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PaymentRouting {}
