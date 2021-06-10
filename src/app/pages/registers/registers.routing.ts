import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ViewRegistersComponent } from './view-registers/view-registers.component';
import { CreateUpdateRegisterComponent } from './create-update-register/create-update-register.component';
import { RegisterDetailsComponent } from './register-details/register-details.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        canActivate: [AdminGuard],
        path: '',
        component: ViewRegistersComponent,
        pathMatch: 'full',
      },
      {
        path: 'create',
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
