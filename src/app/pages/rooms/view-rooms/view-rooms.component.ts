import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Image } from 'src/app/models/image.model';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/EntityServices/room.service';
import Swal from 'sweetalert2';
import { ViewImagesComponent } from '../view-images/view-images.component';

@Component({
  selector: 'app-view-rooms',
  templateUrl: './view-rooms.component.html',
  styleUrls: ['./view-rooms.component.scss'],
})
export class ViewRoomsComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<Room>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  rooms$: Observable<Room[]>;

  constructor(
    private roomService: RoomService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.rooms$ = roomService.entities$;
    this.loading$ = roomService.loading$;

    this.getRooms();

    let registers$ = this.rooms$.subscribe((res: Room[]) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.subscription.add(registers$);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(room: Room) {
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
        this.roomService.delete(room.id);
      } else {
        Swal.fire('Cancelled', 'The room is safe', 'success');
      }
    });
  }
  addNewRoom() {
    this.router.navigateByUrl('pages/rooms/create');
  }

  editRoom(roomid: number) {
    this.router.navigateByUrl('pages/rooms/update/' + roomid);
  }

  getRooms() {
    this.roomService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onRowClicked(row: any) {
    //this.router.navigateByUrl('pages/rooms/details/' + row.id);
  }

  openDialog(id: number, images: Image[]): void {
    const dialogRef = this.dialog.open(ViewImagesComponent, {
      width: '1000px',
      height: '1000px',
      data: { id, images },
    });
  }
}
