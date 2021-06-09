import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Consumption } from 'src/app/models/consuption.model';
import { Customer } from 'src/app/models/customer.model';
import { Payment } from 'src/app/models/payment.model';
import { Stay } from 'src/app/models/stay.model';
import { ConsumptionService } from 'src/app/services/EntityServices/consumption.service';
import { PaymentService } from 'src/app/services/EntityServices/payment.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';

@Component({
  selector: 'app-stay-details',
  templateUrl: './stay-details.component.html',
  styleUrls: ['./stay-details.component.scss'],
})
export class StayDetailsComponent implements OnInit, OnDestroy {
  private stayId: number;
  public paymentsCount: number;
  public consumptionsCount: number;
  public stay: Stay;
  public payments: Payment[];
  public customers: Customer[];
  private subscription: Subscription = new Subscription();
  private selectedStay$: Observable<Stay>;
  constructor(
    private stayService: StayService,
    private route: ActivatedRoute,
    private consumptionService: ConsumptionService,
    private paymentService: PaymentService
  ) {
    this.selectedStay$ = stayService.selectedStay$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.stayId = params['id'];
      if (this.stayId > 0) {
        this.stayService.getStayByKey(this.stayId);
      }
    });

    const suscription = this.selectedStay$.subscribe((res: Stay) => {
      if (res != null) {
        this.stay = res;
        this.consumptionsCount = res.consumptions.length;
        this.paymentsCount = res.payments.length;
        this.consumptionService.selectStayConsumptions(res.consumptions);
        this.customers = res.customers;
        this.paymentService.selectPayments(res.payments);
      }
    });

    this.subscription.add(suscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
