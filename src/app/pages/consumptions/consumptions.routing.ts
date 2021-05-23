import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewConsumptionsComponent } from './view-consumptions/view-consumptions.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewConsumptionsComponent,
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ConsumtionsRouting {}
