import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewProductsComponent,
        pathMatch: 'full',
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProductRouting {}
