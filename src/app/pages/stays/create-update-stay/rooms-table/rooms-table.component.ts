import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Image } from 'src/app/models/image.model';
import { Room } from 'src/app/models/room.model';
import { ViewImagesComponent } from 'src/app/pages/rooms/view-images/view-images.component';

@Component({
  selector: 'app-rooms-table',
  templateUrl: './rooms-table.component.html',
  styleUrls: ['./rooms-table.component.scss'],
})
export class RoomsTableComponent implements OnInit {
  @Input() public rooms: Room[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<Room>;

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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.rooms);

    this.dataSource = new MatTableDataSource(this.rooms);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
}
