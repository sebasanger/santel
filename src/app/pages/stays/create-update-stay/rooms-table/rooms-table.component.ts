import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Image } from 'src/app/models/image.model';
import { Room } from 'src/app/models/room.model';
import { ViewImagesComponent } from 'src/app/pages/rooms/view-images/view-images.component';
import {
  selectAvailableRooms,
  selectSelectedRoom,
} from 'src/app/store/room/room.selectors';
@Component({
  selector: 'app-rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.scss'],
})
export class RoomsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Room>;
  public roomSelectedId: number;
  @Output() selectRoomId = new EventEmitter<number>();

  displayedColumns: string[] = [
    'id',
    'number',
    'capacity',
    'floor',
    'singleBed',
    'doubleBed',
    'available',
    'enabled',
    'images',
  ];

  constructor(
    public dialog: MatDialog,
    private roomStore: Store<{ room: any }>
  ) {}

  ngOnInit(): void {
    this.roomStore.select(selectAvailableRooms).subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.roomStore.select(selectSelectedRoom).subscribe((res) => {
      this.roomSelectedId = res;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: number, images: Image[]): void {
    this.dialog.open(ViewImagesComponent, {
      width: '1000px',
      height: '1000px',
      data: { id, images },
    });
  }

  selectRoom(id: number) {
    this.roomSelectedId = id;
    this.selectRoomId.emit(id);
  }
}
