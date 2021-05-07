import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { authRoot } from './auth/indexAuth';
import { userRoot } from './user/indexUser';
import { menuReducer } from './menu/menu.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MenuEfects } from './menu/menu.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      auth: authRoot.authReducer,
      user: userRoot.userReducer,
      menu: menuReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      authRoot.AuthEffects,
      userRoot.UserEffects,
      MenuEfects,
    ]),
    CommonModule,
  ],
  exports: [StoreModule],
})
export class StateModule {}
