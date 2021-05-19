import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UploadImageComponent } from 'src/app/components/upload-image/upload-image.component';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/EntityServices/room.service';
import { UploadRoomImagePayload } from 'src/app/interfaces/rooms/upload-room-image.interface';
import Swal from 'sweetalert2';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-remove-images',
  templateUrl: './add-remove-images.component.html',
  styleUrls: ['./add-remove-images.component.scss'],
})
export class AddRemoveImagesComponent implements OnInit {
  private roomId: number;
  public cols: number;
  public room: Room;
  private ngUnsubscribe: Subject<boolean> = new Subject();
  public temporalImage: any = '';
  private updateImagePayload: UploadRoomImagePayload = {
    file: null,
    roomId: 0,
    title: '',
  };
  public titleFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
      takeUntil(this.ngUnsubscribe);
      this.loadRoomData(this.roomId);
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
          this.cols = 2;
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.cols = 3;
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.cols = 3;
        }
      });
  }

  loadRoomData(roomId: number) {
    if (roomId > 0) {
      this.roomService.getByKey(roomId).subscribe((res: Room) => {
        this.room = res;
      });
    }
  }

  openDialog() {
    this.dialog.open(UploadImageComponent, {
      data: {
        type: 'user',
        id: this.roomId,
      },
    });
  }

  deleteImage(imageId: number) {
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
        this.roomService.delteRoomImage(this.roomId, imageId).subscribe(() => {
          Swal.fire('Deleted', 'the image is deleted', 'success');
          this.loadRoomData(this.roomId);
        });
      } else {
        Swal.fire('Cancelled', 'the image is safe', 'warning');
      }
    });
  }

  changeImage(e: any) {
    const file: File = e.files[0];

    if (!file) {
      this.temporalImage = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.temporalImage = reader.result;
    };
    this.updateImagePayload.file = file;
  }

  saveImage() {
    this.updateImagePayload.roomId = this.roomId;
    this.updateImagePayload.title = this.titleFormControl.value;
    this.roomService.uploadImage(this.updateImagePayload).subscribe(() => {
      Swal.fire('Success', 'the image is saved', 'success');
      this.clean();
      this.loadRoomData(this.roomId);
    });
    this.temporalImage = null;
  }

  clean() {
    this.temporalImage = null;
    this.titleFormControl.setValue('');
    this.updateImagePayload = {
      file: null,
      roomId: 0,
      title: '',
    };
  }
}
