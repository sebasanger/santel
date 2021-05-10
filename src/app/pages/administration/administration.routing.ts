import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReasonsComponent } from './reasons/reasons.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { InvoicesComponent } from './invoices/invoices.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'reasons',
        component: ReasonsComponent,
        pathMatch: 'full',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        pathMatch: 'full',
      },
      {
        path: 'brands',
        component: BrandsComponent,
        pathMatch: 'full',
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        pathMatch: 'full',
      },
      { path: '**', redirectTo: 'reasons' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AdministrationRouting {}
