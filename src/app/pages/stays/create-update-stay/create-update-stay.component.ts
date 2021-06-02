import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateUpdateStayPayload } from 'src/app/interfaces/stay/CreateStayPayload';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Customer } from 'src/app/models/customer.model';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Reason } from 'src/app/models/reason.model';
import { RoomPrice } from 'src/app/models/room-price.model';
import { Stay } from 'src/app/models/stay.model';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import { ReasonService } from 'src/app/services/EntityServices/reason.service';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import { setSelectedRoom } from 'src/app/store/room/room.actions';
import { getRoomsAvailables } from 'src/app/store/room/room.api.actions';
import { setSelectedCustomers } from 'src/app/store/stay/stay.actions';
import { selectSelectedCustomers } from 'src/app/store/stay/stay.selectors';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-update-stay',
  templateUrl: './create-update-stay.component.html',
  styleUrls: ['./create-update-stay.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class CreateUpdateStayComponent implements OnInit {
  stayFormGroup: FormGroup;
  roomFormGroup: FormGroup;
  customersFormGroup: FormGroup;
  paymentFormGroup: FormGroup;
  public totalToPay: number;
  public remaining: number;
  public totalDays: number;
  private stayId: number;
  selectedCustomers: Customer[];
  private ngUnsubscribe: Subject<boolean> = new Subject();
  reasons$: Observable<Reason[]>;
  public stay: Stay;
  roomPrices$: Observable<RoomPrice[]>;
  paymentMethods$: Observable<PaymentMethod[]>;

  constructor(
    private stayStore: Store<{ stay: any }>,
    private _formBuilder: FormBuilder,
    private roomStore: Store<{ room: any }>,
    private roomPriceService: RoomPriceService,
    private paymentMethodService: PaymentMethodService,
    private reasonService: ReasonService,
    private stayService: StayService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.stayFormGroup = this._formBuilder.group({
      totalGuest: [
        '',
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
      start: ['', Validators.required],
      end: ['', Validators.required],
      reason: [''],
    });

    this.roomFormGroup = this._formBuilder.group({
      room: ['', Validators.required],
    });

    this.customersFormGroup = this._formBuilder.group({
      customers: ['', Validators.required],
    });

    this.paymentFormGroup = this._formBuilder.group({
      roomPrice: ['', Validators.required],
      paid: [''],
      paymentMethod: [''],
    });
  }

  ngOnInit() {
    this.roomPriceService.getAll();
    this.reasonService.getAll();
    this.paymentMethodService.getAll();

    this.reasons$ = this.reasonService.entities$;
    this.roomPrices$ = this.roomPriceService.entities$;
    this.paymentMethods$ = this.paymentMethodService.entities$;

    this.stayStore.select(selectSelectedCustomers).subscribe((res) => {
      this.selectedCustomers = res;
      this.customersFormGroup.get('customers').setValue(res);
    });

    this.route.params.subscribe((params) => {
      this.stayId = params['id'];
      takeUntil(this.ngUnsubscribe);
      if (this.stayId > 0) {
        this.stayService.getByKey(this.stayId).subscribe((res) => {
          this.stay = res;
          this.stayFormGroup.controls['totalGuest'].setValue(res.totalGuest);
          this.stayFormGroup.controls['start'].setValue(res.entryDate);
          this.stayFormGroup.controls['end'].setValue(res.outDate);
          if (res.reason) {
            this.stayFormGroup.controls['reason'].setValue(res.reason.id);
          }
          this.paymentFormGroup.controls['paid'].setValue(res.paid);
          if (res.roomPrice) {
            this.paymentFormGroup.controls['roomPrice'].setValue(
              res.roomPrice.id
            );
            this.setTotalToPay(res.roomPrice.price);
          }

          this.customersFormGroup.get('customers').setValue(res.customers);
          this.stayStore.dispatch(
            setSelectedCustomers({ customers: res.customers })
          );

          this.roomStore.dispatch(
            setSelectedRoom({ selectedRoom: res.room.id })
          );
          this.roomFormGroup.controls['room'].setValue(res.room.id);

          this.selectedCustomers = res.customers;
          this.findRoomsAvailables();
          this.setTotalDays();
        });
      }
    });

    this.suscribeFormChanges();
  }

  findRoomsAvailables() {
    if (
      this.stayFormGroup.get('start').value &&
      this.stayFormGroup.get('end').value &&
      this.stayFormGroup.get('totalGuest').value > 0
    ) {
      const dateStart = new Date(this.stayFormGroup.get('start').value);
      const dateEnd = new Date(this.stayFormGroup.get('end').value);

      const getFreeRoomsPayload: GetFreeRoomsPayload = {
        capacity: this.stayFormGroup.get('totalGuest').value,
        start: dateStart.toISOString().slice(0, 10),
        end: dateEnd.toISOString().slice(0, 10),
      };

      this.roomStore.dispatch(
        getRoomsAvailables({ freeRoomsPayload: getFreeRoomsPayload })
      );
    }
  }

  save() {
    const start = new Date(this.stayFormGroup.get('start').value);
    const end = new Date(this.stayFormGroup.get('end').value);

    const { reason, totalGuest } = this.stayFormGroup.value;

    const { paid, paymentMethod, roomPrice } = this.paymentFormGroup.value;

    const { room } = this.roomFormGroup.value;

    const createUpdateStayPayload: CreateUpdateStayPayload = {
      customers: this.selectedCustomers,
      roomId: room,
      entryDate: start.toISOString().slice(0, 10),
      outDate: end.toISOString().slice(0, 10),
      paid: paid,
      paymentMethodId: paymentMethod,
      reasonId: reason,
      roomPriceId: roomPrice,
      totalGuest: totalGuest,
    };

    if (this.stayId != null || this.stayId != 0) {
      console.log(createUpdateStayPayload);
      createUpdateStayPayload.id = this.stayId;
      this.stayService.createStay(createUpdateStayPayload).subscribe((res) => {
        Swal.fire('Success', 'Stay updated', 'success');
      });
    } else {
      this.stayService.createStay(createUpdateStayPayload).subscribe((res) => {
        Swal.fire('Success', 'Stay created', 'success');
      });
    }
    this.router.navigateByUrl('/pages/stays');
  }

  suscribeFormChanges() {
    this.paymentFormGroup.get('paid').valueChanges.subscribe((res) => {
      this.setRemaining();
    });

    this.stayFormGroup.get('totalGuest').valueChanges.subscribe(() => {
      this.findRoomsAvailables();
    });

    this.stayFormGroup.get('start').valueChanges.subscribe(() => {
      this.setTotalDays();
      this.findRoomsAvailables();
    });

    this.stayFormGroup.get('end').valueChanges.subscribe(() => {
      this.setTotalDays();
      this.findRoomsAvailables();
    });
  }

  setTotalDays() {
    if (
      this.stayFormGroup.get('start').value &&
      this.stayFormGroup.get('end').value
    ) {
      const dateStart = new Date(this.stayFormGroup.get('start').value);
      const dateEnd = new Date(this.stayFormGroup.get('end').value);
      const oneDay = 1000 * 60 * 60 * 24;
      const daysBetween = (dateEnd.getTime() - dateStart.getTime()) / oneDay;
      this.totalDays = daysBetween;
    }
  }

  setTotalToPay(price: number) {
    this.totalToPay = price * this.totalDays;
    this.setRemaining();
  }

  setRemaining() {
    this.remaining = this.totalToPay - this.paymentFormGroup.get('paid').value;
  }

  selectRoom(roomId: number) {
    this.roomFormGroup.get('room').setValue(roomId);
  }
}
