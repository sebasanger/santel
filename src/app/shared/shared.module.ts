import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Nopage404Component } from './nopage404/nopage404.component';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from '../interceptors/loader-interceptor';
import { LangSelectorComponent } from './lang-selector/lang-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { ComponentPageHeaderComponent } from './component-page-header/component-page-header.component';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    NavigationComponent,
    Nopage404Component,
    ThemePickerComponent,
    LoaderComponent,
    LangSelectorComponent,
    ComponentPageHeaderComponent,
  ],
  exports: [
    NavigationComponent,
    Nopage404Component,
    ThemePickerComponent,
    LoaderComponent,
    TranslateModule,
    LangSelectorComponent,
    ComponentPageHeaderComponent,
    RouterModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatInputModule,
    MatTableModule,
  ],
  imports: [
    TranslateModule,
    RouterModule,
    CommonModule,
    LayoutModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
