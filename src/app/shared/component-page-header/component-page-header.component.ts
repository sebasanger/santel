import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-component-page-header',
  templateUrl: './component-page-header.component.html',
  styleUrls: ['./component-page-header.component.scss'],
})
export class ComponentPageHeaderComponent implements OnInit {
  @Input() title: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.title == null) {
      let lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

      lastUrlSegment =
        lastUrlSegment.charAt(0).toUpperCase() + lastUrlSegment.slice(1);
      this.title = lastUrlSegment;
    }
  }
}
