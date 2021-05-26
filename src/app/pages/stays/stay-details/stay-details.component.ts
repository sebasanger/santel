import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consumption } from 'src/app/models/consuption.model';
import { Customer } from 'src/app/models/customer.model';
import { Payment } from 'src/app/models/payment.model';
import { Stay } from 'src/app/models/stay.model';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stay-details',
  templateUrl: './stay-details.component.html',
  styleUrls: ['./stay-details.component.scss'],
})
export class StayDetailsComponent implements OnInit {
  private stayId: number;
  public stay: Stay;
  public payments: Payment[];
  public consumptions: Consumption[];
  public customers: Customer[];
  public cols: number;
  constructor(
    private stayService: StayService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stayId = params['id'];

      if (this.stayId > 0) {
        this.stayService.getByKey(this.stayId).subscribe((res) => {
          this.stay = res;
          this.customers = res.customers;
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
}
