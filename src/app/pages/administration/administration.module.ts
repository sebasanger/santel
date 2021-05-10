import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { ReasonsComponent } from './reasons/reasons.component';
import { CreateEditReasonComponent } from './reasons/create-edit-reason/create-edit-reason.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateEditCategoriesComponent } from './categories/create-edit-categories/create-edit-categories.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateUpdateBrandsComponent } from './brands/create-update-brands/create-update-brands.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CreateEditInvoiceComponent } from './invoices/create-edit-invoice/create-edit-invoice.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
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
  imports: [
    CommonModule,
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
  ],
})
export class AdministrationModule {}
