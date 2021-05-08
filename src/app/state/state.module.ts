import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authRoot } from './auth/indexAuth';
import { userRoot } from './user/indexUser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authRoot.authReducer,
      user: userRoot.userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([authRoot.AuthEffects, userRoot.UserEffects]),
    CommonModule,
  ],
  exports: [StoreModule],
})
export class StateModule {}
