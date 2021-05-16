import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/EntityServices/room.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss'],
})
export class RoomDetailsComponent implements OnInit {
  private roomId: number;
  public room: Room;
  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['id'];

      if (this.roomId > 0) {
        this.roomService.getByKey(this.roomId).subscribe((res) => {
          this.room = res;
        });
      }
    });
  }

  editRoom(userid: number) {
    this.router.navigateByUrl('pages/rooms/update/' + userid);
  }

  deleteRoom(id: number) {
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
        this.roomService.delete(id);

        this.router.navigateByUrl('pages/rooms');
      } else {
        Swal.fire('Cancelled', 'the room is safe', 'error');
      }
    });
  }
}
