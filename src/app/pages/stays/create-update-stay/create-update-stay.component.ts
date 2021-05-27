import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Room } from 'src/app/models/room.model';
import { StayService } from 'src/app/services/EntityServices/stay.service';

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
  public availableRooms: Room[];

  constructor(
    private _formBuilder: FormBuilder,
    private stayService: StayService
  ) {}

  ngOnInit() {
    this.stayFormGroup = this._formBuilder.group({
      capacity: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
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
      capacity: this.stayFormGroup.get('capacity').value,
      start: startDate.toISOString().slice(0, 10),
      end: endDate.toISOString().slice(0, 10),
    };
    this.stayService
      .getFreeRooms(getFreeRoomsPayload)
      .subscribe((res: Room[]) => {
        this.availableRooms = res;
      });
  }
}
