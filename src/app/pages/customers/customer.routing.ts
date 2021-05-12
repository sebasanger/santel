import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewCustomersComponent } from './view-customers/view-customers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewCustomersComponent,
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CustomerRouting {}
