import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/EntityServices/room.service';

@Component({
  selector: 'app-create-update-room',
  templateUrl: './create-update-room.component.html',
  styleUrls: ['./create-update-room.component.scss'],
})
export class CreateUpdateRoomComponent implements OnInit {
  public roomId: number;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public pageTitle: string = 'agregar';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
      takeUntil(this.ngUnsubscribe);
      if (this.roomId > 0) {
        this.roomService.getByKey(this.roomId).subscribe((res: Room) => {
          this.loadRoom(res);
        });
      }
    });
  }

  roomForm = this.fb.group({
    number: [null, [Validators.required]],
    capacity: [null, Validators.required],
    floor: [null, Validators.required],
    enabled: [null, Validators.required],
    available: [null, Validators.required],
    singleBed: [null, Validators.required],
    doubleBed: [null, Validators.required],
  });

  loadRoom(room: Room) {
    if (room != null) {
      this.roomId = room.id;
      this.roomForm.controls['number'].setValue(room.number);
      this.roomForm.controls['capacity'].setValue(room.capacity);
      this.roomForm.controls['floor'].setValue(room.floor);
      this.roomForm.controls['enabled'].setValue(room.enabled);
      this.roomForm.controls['available'].setValue(room.available);
      this.roomForm.controls['singleBed'].setValue(room.singleBed);
      this.roomForm.controls['doubleBed'].setValue(room.doubleBed);
    }
  }

  onSubmit() {
    if (this.roomForm.invalid) {
      return;
    }
    const {
      number,
      capacity,
      floor,
      enabled,
      available,
      singleBed,
      doubleBed,
    } = this.roomForm.controls;

    const roomRequestPayload: Room = new Room(
      number.value,
      floor.value,
      capacity.value,
      singleBed.value,
      doubleBed.value,
      available.value,
      enabled.value,
      null,
      false
    );
    if (this.roomId > 0) {
      roomRequestPayload.id = this.roomId;
      this.roomService.update(roomRequestPayload);
    } else {
      this.roomService.add(roomRequestPayload);
    }
    this.router.navigateByUrl('pages/rooms');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
