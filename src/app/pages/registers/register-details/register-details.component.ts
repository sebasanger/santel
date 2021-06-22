import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/models/payment.model';
import { Register } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterService } from 'src/app/services/EntityServices/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss'],
})
export class RegisterDetailsComponent implements OnInit {
  private registerId: number;
  public register: Register;
  public payments: Payment[];
  private roles$: Observable<String[]>;
  private registerActive$: Observable<Register>;

  private registerActive: Register;
  private rolesAuthUser: String[];
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerActive$ = registerService.activeRegister$;
    this.roles$ = authService.roles$;
  }

  ngOnInit(): void {
    this.validateUserRole();

    this.route.params.subscribe((params) => {
      this.registerId = params['id'];

      if (this.registerId > 0) {
        this.registerService.getByKey(this.registerId).subscribe((res) => {
          this.register = res;

          this.payments = res.payments;
        });
      }
    });
  }

  editRegister(userid: number) {
    this.router.navigateByUrl('pages/registers/update/' + userid);
  }

  deleteRegister(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.registerService.delete(id);

        this.router.navigateByUrl('pages/users');
      } else {
        Swal.fire('Cancelled', 'the register is safe', 'error');
      }
    });
  }

  validateUserRole() {
    this.registerActive$.subscribe((res) => {
      this.registerActive = res;
    });
    this.roles$.subscribe((res) => {
      if (res != null && res != undefined) {
        this.rolesAuthUser = res;
      }
    });
    setTimeout(() => {
      if (
        !this.rolesAuthUser.includes('ADMIN') &&
        this.registerActive.id != this.registerId
      ) {
        this.router.navigateByUrl('pages');
      }
    }, 500);
  }
}
