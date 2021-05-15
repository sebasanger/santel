import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewRoomComponent } from './view-room/view-room.component';
import { CreateUpdateRoomComponent } from './create-update-room/create-update-room.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewRoomComponent,
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
        component: ViewRoomComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RoomsRoutingModule {}
