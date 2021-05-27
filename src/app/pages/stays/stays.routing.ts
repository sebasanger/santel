import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewStaysComponent } from './view-stays/view-stays.component';
import { StayDetailsComponent } from './stay-details/stay-details.component';
import { CreateUpdateStayComponent } from './create-update-stay/create-update-stay.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewStaysComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateUpdateStayComponent,
      },
      {
        path: 'update/:id',
        component: CreateUpdateStayComponent,
      },
      {
        path: 'details/:id',
        component: StayDetailsComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StaysRouting {}
