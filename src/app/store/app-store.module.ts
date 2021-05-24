import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authRoot } from './auth/indexAuth';
import { userRoot } from './user/indexUser';
import { customerRoot } from './customer/indexCustomer';
import { registerRoot } from './register/indexCustomer';
import { paymentRoot } from './payments/indexPayment';
import { stayRoot } from './stay/indexStay';
import { consumptionRoot } from './consumptions/indexConsumption';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { NgrxDataToastService } from './ngrx-data-toast.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [],
  imports: [
    MatSnackBarModule,
    StoreModule.forRoot({
      auth: authRoot.authReducer,
      user: userRoot.userReducer,
      customer: customerRoot.customerReducer,
      register: registerRoot.registerReducer,
      payment: paymentRoot.paymentReducer,
      consumption: consumptionRoot.consumptionReducer,
      stay: stayRoot.stayReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      authRoot.AuthEffects,
      userRoot.UserEffects,
      customerRoot.CustomerEffects,
      registerRoot.RegisterEffects,
      paymentRoot.PaymentEffects,
      consumptionRoot.ConsumptionEffects,
      stayRoot.StayEffects,
    ]),
    CommonModule,
  ],
  exports: [StoreModule],
})
export class AppStoreModule {
  constructor(toastService: NgrxDataToastService) {}
}
