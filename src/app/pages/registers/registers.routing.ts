import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewRegistersComponent } from './view-registers/view-registers.component';
import { CreateUpdateRegisterComponent } from './create-update-register/create-update-register.component';
import { RegisterDetailsComponent } from './register-details/register-details.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ViewRegistersComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: CreateUpdateRegisterComponent,
      },
      {
        path: 'update/:id',
        component: CreateUpdateRegisterComponent,
      },
      {
        path: 'details/:id',
        component: RegisterDetailsComponent,
      },

      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RegistersRoutingModule {}
