import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { ChartsComponent } from './charts/charts.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { AdministrationModule } from './administration/administration.module';
import { PagesRoutingModule } from './pages.routing';
import { UsersModule } from './users/users.module';
@NgModule({
  declarations: [PagesComponent, DashboardComponent, ChartsComponent],
  exports: [PagesComponent, DashboardComponent, ChartsComponent],
  imports: [
    PagesRoutingModule,
    CommonModule,
    SharedModule,
    AdministrationModule,
    UsersModule,
    ComponentsModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
  ],
})
export class PagesModule {}
