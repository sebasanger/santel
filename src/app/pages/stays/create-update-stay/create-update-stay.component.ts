import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateStayPayload } from 'src/app/interfaces/stay/CreateStayPayload';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Customer } from 'src/app/models/customer.model';
import { PaymentMethod } from 'src/app/models/payment-method.model';
import { Reason } from 'src/app/models/reason.model';
import { RoomPrice } from 'src/app/models/room-price.model';
import { PaymentMethodService } from 'src/app/services/EntityServices/payment-method.service';
import { ReasonService } from 'src/app/services/EntityServices/reason.service';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import { getRoomsAvailables } from 'src/app/store/room/room.api.actions';
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

  selectedCustomers: Customer[];

  reasons$: Observable<Reason[]>;
  public selectedReason: Reason;

  roomPrices$: Observable<RoomPrice[]>;
  public selectedRoomPrice: RoomPrice;

  paymentMethods$: Observable<PaymentMethod[]>;
  public selectedPaymentMethod: PaymentMethod;

  constructor(
    private stayStore: Store<{ stay: any }>,
    private _formBuilder: FormBuilder,
    private roomStore: Store<{ room: any }>,
    private roomPriceService: RoomPriceService,
    private paymentMethodService: PaymentMethodService,
    private reasonService: ReasonService,
    private stayService: StayService,
    private router: Router
  ) {}

  ngOnInit() {
    this.roomPriceService.getAll();
    this.reasonService.getAll();
    this.paymentMethodService.getAll();

    this.reasons$ = this.reasonService.entities$;
    this.roomPrices$ = this.roomPriceService.entities$;
    this.paymentMethods$ = this.paymentMethodService.entities$;

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

    this.stayStore.select(selectSelectedCustomers).subscribe((res) => {
      this.selectedCustomers = res;
      this.customersFormGroup.get('customers').setValue(res);
    });

    this.suscribeFormChanges();
  }

  findRoomsAvailables() {
    const startDate: Date = this.stayFormGroup.get('start').value;
    const endDate: Date = this.stayFormGroup.get('end').value;

    const getFreeRoomsPayload: GetFreeRoomsPayload = {
      capacity: this.stayFormGroup.get('totalGuest').value,
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    };

    this.roomStore.dispatch(
      getRoomsAvailables({ freeRoomsPayload: getFreeRoomsPayload })
    );
  }

  selectRoom(roomId: number) {
    this.roomFormGroup.get('room').setValue(roomId);
  }

  save() {
    const { start, end, reason, totalGuest } = this.stayFormGroup.value;

    const { paid, paymentMethod, roomPrice } = this.paymentFormGroup.value;

    const { room } = this.roomFormGroup.value;

    const createStayPayload: CreateStayPayload = {
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

    this.stayService.createStay(createStayPayload).subscribe((res) => {
      Swal.fire('Success', 'Stay created', 'success');
      this.router.navigateByUrl('/pages/stays');
    });
  }

  suscribeFormChanges() {
    this.paymentFormGroup.get('paid').valueChanges.subscribe((res) => {
      this.setRemaining();
    });

    this.stayFormGroup.get('totalGuest').valueChanges.subscribe(() => {
      this.searchAvailableRooms();
    });

    this.stayFormGroup.get('start').valueChanges.subscribe(() => {
      this.setTotalDays();
      this.searchAvailableRooms();
    });

    this.stayFormGroup.get('end').valueChanges.subscribe(() => {
      this.setTotalDays();
      this.searchAvailableRooms();
    });
  }

  searchAvailableRooms() {
    if (
      this.stayFormGroup.get('start').value &&
      this.stayFormGroup.get('end').value &&
      this.stayFormGroup.get('totalGuest').value > 0
    ) {
      this.findRoomsAvailables();
    }
  }

  setTotalDays() {
    if (
      this.stayFormGroup.get('start').value &&
      this.stayFormGroup.get('end').value
    ) {
      const startDate: Date = this.stayFormGroup.get('start').value;
      const endDate: Date = this.stayFormGroup.get('end').value;
      const oneDay = 1000 * 60 * 60 * 24;
      const daysBetween = (endDate.getTime() - startDate.getTime()) / oneDay;
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
}
