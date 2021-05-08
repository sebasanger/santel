import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-component-page-header',
  templateUrl: './component-page-header.component.html',
  styleUrls: ['./component-page-header.component.scss'],
})
export class ComponentPageHeaderComponent implements OnInit {
  public title: string;
  constructor(
    private menuStore: Store<{ menu: any }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

    this.menuStore.select('menu').subscribe((res) => {
      this.title = res.title;
    });

    this.title = lastUrlSegment;
  }
}
