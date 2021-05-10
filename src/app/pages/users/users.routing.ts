import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewUsersComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateUpdateUserComponent,
      },
      {
        path: 'update/:id',
        component: CreateUpdateUserComponent,
      },
      {
        path: 'details/:id',
        component: UserDetailsComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class UserRoutingModule {}
