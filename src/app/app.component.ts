import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'sangular';

  private authenticatedUser$: Observable<User>;
  private roles$: Observable<String[]>;
  constructor(private authService: AuthService) {
    this.authenticatedUser$ = authService.authUser$;
    this.roles$ = authService.roles$;
  }

  ngOnInit() {
    /*this.authenticatedUser$.subscribe((res) => {
      console.log(res);
    });
    this.roles$.subscribe((res) => {
      console.log(res);
    });
    */
  }
}
