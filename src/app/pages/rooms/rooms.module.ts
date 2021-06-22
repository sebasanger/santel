import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsRoutingModule } from './rooms.routing';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';
import { CreateUpdateRoomComponent } from './create-update-room/create-update-room.component';
import { RoomsComponent } from './rooms.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { ComponentsModule } from 'src/app/components/components.module';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ViewImagesComponent } from './view-images/view-images.component';
import { AddRemoveImagesComponent } from './add-remove-images/add-remove-images.component';
@NgModule({
  declarations: [
    ViewRoomsComponent,
    CreateUpdateRoomComponent,
    RoomsComponent,
    RoomDetailsComponent,
    ViewImagesComponent,
    AddRemoveImagesComponent,
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
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
    NgImageSliderModule,
  ],
  exports: [ViewImagesComponent],
})
export class RoomsModule {}
