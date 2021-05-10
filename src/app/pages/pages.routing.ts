import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AdminGuard } from '../guards/admin.guard';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { CreateUpdateUserComponent } from './users/create-update-user/create-update-user.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';
import { ChartsComponent } from './charts/charts.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { AdministrationModule } from './administration/administration.module';
import { AdministrationComponent } from './administration/administration.component';

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
        component: UsersComponent,
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'administration',
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
