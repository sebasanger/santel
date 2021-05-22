import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumption } from 'src/app/models/consuption.model';
import { Payment } from 'src/app/models/payment.model';
import { Register } from 'src/app/models/register.model';
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
  public consumptions: Consumption[];
  public cols: number;
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.registerId = params['id'];

      if (this.registerId > 0) {
        this.registerService.getByKey(this.registerId).subscribe((res) => {
          this.register = res;
          this.payments = res.payments;
          this.consumptions = res.consumptions;
        });
      }
    });
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this.cols = 1;
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this.cols = 1;
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.cols = 2;
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.cols = 2;
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
}
