import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { ViewRegistersComponent } from './view-registers/view-registers.component';
import { CreateUpdateRegisterComponent } from './create-update-register/create-update-register.component';
import { RegisterDetailsComponent } from './register-details/register-details.component';
import { RegistersRoutingModule } from './registers.routing';
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
import { CloseRegisterComponent } from './close-register/close-register.component';
import { PaymentsTableComponent } from './register-details/payments-table/payments-table.component';

@NgModule({
  declarations: [
    RegistersComponent,
    ViewRegistersComponent,
    CreateUpdateRegisterComponent,
    RegisterDetailsComponent,
    CloseRegisterComponent,
    PaymentsTableComponent,
  ],
  imports: [
    CommonModule,
    RegistersRoutingModule,
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
  ],
})
export class RegistersModule {}
