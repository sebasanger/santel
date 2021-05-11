import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomPrice } from 'src/app/models/room-price.model';
import { RoomPriceService } from 'src/app/services/EntityServices/room-price.service';

export interface DialogData {
  id?: number;
  price?: string;
  description?: number;
  title: string;
}
@Component({
  selector: 'app-create-edit-room-price',
  templateUrl: './create-edit-room-price.component.html',
  styleUrls: ['./create-edit-room-price.component.scss'],
})
export class CreateEditRoomPriceComponent {
  roomPriceForm = this.fb.group({
    price: [this.data.price, Validators.required],
    description: [this.data.description, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private roomPriceService: RoomPriceService,
    public dialogRef: MatDialogRef<CreateEditRoomPriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onSubmit() {
    if (this.roomPriceForm.invalid) {
      return;
    }
    const priceValue: number = this.roomPriceForm.controls['price'].value;
    const descriptionValue: string =
      this.roomPriceForm.controls['description'].value;

    if (this.data.id != null) {
      const newRoomPrice = new RoomPrice(
        this.data.id,
        descriptionValue,
        priceValue
      );
      this.update(newRoomPrice);
    } else {
      const newRoomPrice = new RoomPrice(null, descriptionValue, priceValue);
      this.add(newRoomPrice);
    }
    this.dialogRef.close();
  }

  add(roomPrice: RoomPrice) {
    this.roomPriceService.add(roomPrice);
  }
  update(roomPrice: RoomPrice) {
    this.roomPriceService.update(roomPrice);
  }
}
