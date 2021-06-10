import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';
import { ChartsComponent } from './charts/charts.component';
import { AdministrationComponent } from './administration/administration.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminGuard } from '../guards/admin.guard';
import { RoomsComponent } from './rooms/rooms.component';
import { RegistersComponent } from './registers/registers.component';
import { StaysComponent } from './stays/stays.component';
import { ConsumptionsComponent } from './consumptions/consumptions.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'charts',
        component: ChartsComponent,
      },
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        component: UsersComponent,
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'stays',
        component: StaysComponent,
        loadChildren: () =>
          import('./stays/stays.module').then((m) => m.StaysModule),
      },
      {
        path: 'customers',
        component: CustomersComponent,
        loadChildren: () =>
          import('./customers/customers.module').then((m) => m.CustomersModule),
      },
      {
        path: 'payments',
        component: PaymentsComponent,
        loadChildren: () =>
          import('./payments/payments.module').then((m) => m.PaymentsModule),
      },
      {
        path: 'consumptions',
        component: ConsumptionsComponent,
        loadChildren: () =>
          import('./consumptions/consumptions.module').then(
            (m) => m.ConsumptionsModule
          ),
      },
      {
        path: 'products',
        component: ProductsComponent,
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: 'rooms',
        component: RoomsComponent,
        loadChildren: () =>
          import('./rooms/rooms.module').then((m) => m.RoomsModule),
      },
      {
        path: 'registers',
        component: RegistersComponent,
        loadChildren: () =>
          import('./registers/registers.module').then((m) => m.RegistersModule),
      },
      {
        path: 'administration',
        canActivate: [AdminGuard],
        component: AdministrationComponent,
        loadChildren: () =>
          import('./administration/administration.module').then(
            (m) => m.AdministrationModule
          ),
      },
      {
        path: 'update-acount',
        component: UpdateAcountComponent,
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}
