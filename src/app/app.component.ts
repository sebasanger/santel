import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reason } from './models/reason.model';
import { User } from './models/user.model';
import { ReasonService } from './services/reason.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sangular';
  loading$: Observable<boolean>;
  heroes$: Observable<Reason[]>;

  constructor(private reasonService: ReasonService) {
    this.heroes$ = reasonService.entities$;
    this.loading$ = reasonService.loading$;
  }

  ngOnInit() {
    this.getReasons();
  }

  add(reason: Reason) {
    this.reasonService.add(reason);
  }

  delete(reason: Reason) {
    this.reasonService.delete(reason.id);
  }

  getReasons() {
    this.reasonService.getAll();
  }

  update(reason: Reason) {
    this.reasonService.update(reason);
  }
}
