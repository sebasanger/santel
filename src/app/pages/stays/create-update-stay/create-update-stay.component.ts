import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Reason } from 'src/app/models/reason.model';
import { RoomPrice } from 'src/app/models/room-price.model';
import { ReasonService } from 'src/app/services/EntityServices/reason.service';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';
import { getRoomsAvailables } from 'src/app/store/room/room.api.actions';
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

  reasons$: Observable<Reason[]>;
  public selectedReason: Reason;

  roomPrices$: Observable<RoomPrice[]>;
  public selectedRoomPrice: RoomPrice;

  constructor(
    private _formBuilder: FormBuilder,
    private roomStore: Store<{ room: any }>,
    private roomPriceService: RoomPriceService,
    private reasonService: ReasonService
  ) {}

  ngOnInit() {
    this.roomPriceService.getAll();
    this.reasonService.getAll();

    this.reasons$ = this.reasonService.entities$;
    this.roomPrices$ = this.roomPriceService.entities$;

    this.stayFormGroup = this._formBuilder.group({
      totalGuest: [
        '',
        [Validators.required, Validators.min(1), Validators.max(15)],
      ],
      start: ['', Validators.required],
      end: ['', Validators.required],
      roomPrice: ['', Validators.required],
      reason: [''],
      paid: [''],
    });
    this.roomFormGroup = this._formBuilder.group({
      room: ['', Validators.required],
    });
    this.customersFormGroup = this._formBuilder.group({
      customers: ['', Validators.required],
    });
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
}
