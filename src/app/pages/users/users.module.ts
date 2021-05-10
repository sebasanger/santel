import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { CreateUpdateUserComponent } from './create-update-user/create-update-user.component';
import { UpdateAcountComponent } from '../update-acount/update-acount.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserRoutingModule } from './users.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UsersComponent,
    ViewUsersComponent,
    CreateUpdateUserComponent,
    UpdateAcountComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
