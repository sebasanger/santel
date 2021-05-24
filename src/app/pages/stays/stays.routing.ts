import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewStaysComponent } from './view-stays/view-stays.component';
import { StayDetailsComponent } from './stay-details/stay-details.component';

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
