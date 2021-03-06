import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { apiUserAuthLogout } from 'src/app/store/auth/auth.actions';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { MenuItem } from 'src/app/interfaces/ui/menu.interface';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

const page_title: string = environment.page_title;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public menuItems: MenuItem[];
  public adminMenuItems: MenuItem[];
  public user: User;
  public avatar: string;
  public title = page_title;
  public actualTitle: string;
  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private authStore: Store<{ auth: any }>,
    private titleService: Title,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.authStore.select('auth').subscribe((data: any) => {
      if (data.user != null) {
        this.user = data.user;
        this.avatar = this.user.avatar;
        this.setTraductionsAndChargeMenu();
      }
    });
  }

  setTraductionsAndChargeMenu() {
    this.translate.stream('MENU').subscribe((res) => {
      if (res != undefined) {
        this.chargeMenu();
      }
    });
  }

  chargeMenu() {
    if (this.user != null) {
      this.menuItems = [
        {
          title: this.translate.instant('MENU.DASHBOARD'),
          icon: 'home',
          path: '../pages/dashboard',
        },
        {
          title: this.translate.instant('MENU.STAYS'),
          icon: 'event',
          path: '../pages/stays',
        },
        {
          title: this.translate.instant('MENU.CUSTOMERS'),
          icon: 'groups',
          path: '../pages/customers',
        },
        {
          title: this.translate.instant('MENU.ROOMS'),
          icon: 'meeting_room',
          path: '../pages/rooms',
        },

        {
          title: this.translate.instant('MENU.REGISTERS'),
          icon: 'point_of_sale',
          path: '../pages/registers',
        },

        {
          title: this.translate.instant('MENU.CONSUMPTIONS'),
          icon: 'shopping_cart',
          path: '../pages/consumptions',
        },
        {
          title: this.translate.instant('MENU.PAYMENTS'),
          icon: 'attach_money',
          path: '../pages/payments',
        },
        {
          title: this.translate.instant('MENU.CHARTS'),
          icon: 'analytics',
          path: '../pages/charts',
        },
      ];

      if (this.user.roles.includes('ADMIN')) {
        this.menuItems.push({
          title: this.translate.instant('MENU.PRODUCTS'),
          icon: 'inventory_2',
          path: '../pages/products',
        });

        this.adminMenuItems = [
          {
            title: this.translate.instant('MENU.USERS'),
            icon: 'people',
            path: '../pages/users',
          },
          {
            title: this.translate.instant('MENU.REASON'),
            icon: 'api',
            path: '../pages/administration/reasons',
          },
          {
            title: this.translate.instant('MENU.CATEGORY'),
            icon: 'receipt',
            path: '../pages/administration/categories',
          },
          {
            title: this.translate.instant('MENU.BRAND'),
            icon: 'bookmarks',
            path: '../pages/administration/brands',
          },
          {
            title: this.translate.instant('MENU.INVOICE'),
            icon: 'article',
            path: '../pages/administration/invoices',
          },
          {
            title: this.translate.instant('MENU.ROOMPRICE'),
            icon: 'price_change',
            path: '../pages/administration/room-prices',
          },
          {
            title: this.translate.instant('MENU.PAYMENTMETHOD'),
            icon: 'credit_card',
            path: '../pages/administration/payment-methods',
          },
          {
            title: this.translate.instant('MENU.ENTRYPRODUCTS'),
            icon: 'local_shipping',
            path: '../pages/administration/entry-products',
          },
        ];
      }
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle + ' | ' + page_title);
    this.actualTitle = newTitle;
  }

  logout() {
    this.authStore.dispatch(apiUserAuthLogout());
  }

  addNewStay() {
    this.router.navigateByUrl('pages/stays/create');
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
