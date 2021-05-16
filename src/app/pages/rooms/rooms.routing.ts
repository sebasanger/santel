import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateUpdateRoomComponent } from './create-update-room/create-update-room.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { ViewRoomsComponent } from './view-rooms/view-rooms.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewRoomsComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateUpdateRoomComponent,
      },
      {
        path: 'update/:id',
        component: CreateUpdateRoomComponent,
      },
      {
        path: 'details/:id',
        component: RoomDetailsComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RoomsRoutingModule {}
