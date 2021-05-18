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
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];
      takeUntil(this.ngUnsubscribe);
      if (this.roomId > 0) {
        this.roomService.getByKey(this.roomId).subscribe((res: Room) => {
          this.room = res;
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

  openDialog() {
    this.dialog.open(UploadImageComponent, {
      data: {
        type: 'user',
        id: this.roomId,
      },
    });
  }
}
