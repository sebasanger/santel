import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { ViewUsersComponent } from './users/view-users/view-users.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateUserComponent } from './users/create-update-user/create-update-user.component';
import { UpdateAcountComponent } from './update-acount/update-acount.component';
import { ComponentsModule } from '../components/components.module';
import { ChartsComponent } from './charts/charts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { AdministrationComponent } from './administration/administration.component';
import { ReasonsComponent } from './administration/reasons/reasons.component';
import { CreateEditReasonComponent } from './administration/reasons/create-edit-reason/create-edit-reason.component';
import { CategoriesComponent } from './administration/categories/categories.component';
import { CreateEditCategoriesComponent } from './administration/categories/create-edit-categories/create-edit-categories.component';
import { BrandsComponent } from './administration/brands/brands.component';
import { CreateUpdateBrandsComponent } from './administration/brands/create-update-brands/create-update-brands.component';
import { InvoicesComponent } from './administration/invoices/invoices.component';
import { CreateEditInvoiceComponent } from './administration/invoices/create-edit-invoice/create-edit-invoice.component';
@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsersComponent,
    ViewUsersComponent,
    CreateUpdateUserComponent,
    UpdateAcountComponent,
    ChartsComponent,
    UserDetailsComponent,
    AdministrationComponent,
    ReasonsComponent,
    CreateEditReasonComponent,
    CategoriesComponent,
    CreateEditCategoriesComponent,
    BrandsComponent,
    CreateUpdateBrandsComponent,
    InvoicesComponent,
    CreateEditInvoiceComponent,
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    UsersComponent,
    ViewUsersComponent,
    CreateUpdateUserComponent,
    ChartsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
  ],
})
export class PagesModule {}
