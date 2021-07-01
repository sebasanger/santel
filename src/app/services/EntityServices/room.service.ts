import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { GetAllRoomImages } from 'src/app/interfaces/rooms/getAllRoomImages.interface';
import { UploadRoomImagePayload } from 'src/app/interfaces/rooms/upload-room-image.interface';
import { GetFreeRoomsPayload } from 'src/app/interfaces/stay/GetFreeRomsPayload';
import { Room } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class RoomService extends EntityCollectionServiceBase<Room> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private http: HttpClient
  ) {
    super('Room', serviceElementsFactory);
  }

  delteRoomImage(roomId: number, imageId: number) {
    return this.http.delete<any>(
      `${base_url}room/delete/image/${imageId}/room/${roomId}`
    );
  }

  uploadImage(payload: UploadRoomImagePayload) {
    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('title', payload.title);
    return this.http.put<string>(
      `${base_url}room/upload/image/${payload.roomId}`,
      formData
    );
  }

  getFreeRooms(getFreeRoomsPayload: GetFreeRoomsPayload) {
    return this.http.post<Room[]>(
      `${base_url}room/abailability`,
      getFreeRoomsPayload
    );
  }

  getAllRoomImages() {
    return this.http.get<GetAllRoomImages[]>(`${base_url}room/images`);
  }
}
