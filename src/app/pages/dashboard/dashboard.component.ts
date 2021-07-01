import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Breakpoints,
  BreakpointObserver,
  BreakpointState,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { RoomPrice } from 'src/app/models/room-price.model';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';
import { RoomService } from 'src/app/services/EntityServices/room.service';
import { Room } from 'src/app/models/room.model';
import { GetAllRoomImages } from 'src/app/interfaces/rooms/getAllRoomImages.interface';
import { Image } from 'src/app/models/image.model';

export interface ImagesSlider {
  image: String;
  thumbImage: String;
  alt: String;
  title: String;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public totalCols: number;
  public rows: number;
  roomPrices$: Observable<RoomPrice[]>;
  roomImages$: Observable<GetAllRoomImages[]>;
  public imageObject: ImagesSlider[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private roomPriceService: RoomPriceService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.imageObject = [];

    this.roomPriceService.getAll();

    this.roomPrices$ = this.roomPriceService.entities$;

    this.roomImages$ = this.roomService.getAllRoomImages();

    this.roomImages$.subscribe((res) => {
      res.forEach((roomImage: GetAllRoomImages) => {
        roomImage.images.forEach((image) => {
          this.imageObject.push({
            image: image.path,
            thumbImage: image.path,
            alt: image.title,
            title: 'Hab: ' + roomImage.number + ' ' + image.title,
          });
        });
      });
    });

    this.OvserbeBreakoutPage();
  }

  private OvserbeBreakoutPage() {
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
          this.totalCols = 1;
          this.rows = 2;
        }
        if (state.breakpoints[Breakpoints.Small]) {
          this.totalCols = 1;
          this.rows = 2;
        }
        if (state.breakpoints[Breakpoints.Medium]) {
          this.totalCols = 2;
          this.rows = 1;
        }
        if (state.breakpoints[Breakpoints.Large]) {
          this.totalCols = 2;
          this.rows = 1;
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
          this.totalCols = 2;
          this.rows = 1;
        }
      });
  }
}
