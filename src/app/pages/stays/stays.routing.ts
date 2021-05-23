import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewStaysComponent } from './view-stays/view-stays.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewStaysComponent,
        pathMatch: 'full',
      },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StaysRouting {}
