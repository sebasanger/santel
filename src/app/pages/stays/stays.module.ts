import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaysComponent } from './stays.component';
import { ViewStaysComponent } from './view-stays/view-stays.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StaysRouting } from './stays.routing';
import { StayDetailsComponent } from './stay-details/stay-details.component';
import { ConsumptionsTableComponent } from './stay-details/consumptions-table/consumptions-table.component';
import { PaymentsTableComponent } from './stay-details/payments-table/payments-table.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    StaysComponent,
    ViewStaysComponent,
    StayDetailsComponent,
    ConsumptionsTableComponent,
    PaymentsTableComponent,
  ],
  imports: [
    CommonModule,
    StaysRouting,
    SharedModule,
    ComponentsModule,
    MatGridListModule,
    MatCardModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
  ],
})
export class StaysModule {}
