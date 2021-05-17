import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgImageSliderComponent } from 'ng-image-slider';
import { Image } from 'src/app/models/image.model';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/EntityServices/room.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  images: Image[];
}

export interface ImagesSlider {
  image: String;
  thumbImage: String;
  alt: String;
  title: String;
}

@Component({
  selector: 'app-view-images',
  templateUrl: './view-images.component.html',
  styleUrls: ['./view-images.component.scss'],
})
export class ViewImagesComponent implements OnInit {
  public imageObject: ImagesSlider[];
  public room: Room;
  @ViewChild('slide') slider: NgImageSliderComponent;

  constructor(
    private roomService: RoomService,
    public dialogRef: MatDialogRef<ViewImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.imageObject = [];
    this.data.images.forEach((image: Image) => {
      this.imageObject.push({
        image: environment.base_url + 'files/' + image.path,
        thumbImage: environment.base_url + 'files/' + image.path,
        alt: image.title,
        title: image.title,
      });
    });
  }

  close() {
    this.dialogRef.close();
  }
}
