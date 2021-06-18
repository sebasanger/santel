import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { RoomPrice } from 'src/app/models/room-price.model';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';
import Swal from 'sweetalert2';
import { CreateEditRoomPriceComponent } from './create-edit-room-price/create-edit-room-price.component';

@Component({
  selector: 'app-room-prices',
  templateUrl: './room-prices.component.html',
  styleUrls: ['./room-prices.component.scss'],
})
export class RoomPricesComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'price', 'description', 'edit', 'delete'];
  public dataSource: MatTableDataSource<RoomPrice>;
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  errors$: Observable<any>;
  roomPrices$: Observable<RoomPrice[]>;

  constructor(
    private roomPriceService: RoomPriceService,
    public dialog: MatDialog
  ) {
    this.roomPrices$ = roomPriceService.entities$;
    this.loading$ = roomPriceService.loading$;
    this.errors$ = roomPriceService.errors$;

    this.getRoomPrices();

    let registers$ = this.roomPrices$.subscribe((res: RoomPrice[]) => {
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

  openDialog(id?: number, price?: number, description?: string): void {
    this.dialog.open(CreateEditRoomPriceComponent, {
      width: '600px',
      height: '700px',
      data: { id, price, description },
    });
  }

  delete(roomPrice: RoomPrice) {
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
        this.roomPriceService.delete(roomPrice.id);
      } else {
        Swal.fire('Cancelled', 'The room price is safe', 'success');
      }
    });
  }

  getRoomPrices() {
    this.roomPriceService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
