import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stay } from 'src/app/models/stay.model';
import { StayService } from 'src/app/services/EntityServices/stay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stay-table',
  templateUrl: './stay-table.component.html',
  styleUrls: ['./stay-table.component.scss'],
})
export class StayTableComponent implements OnInit {
  @Input() public stay: Stay;
  constructor(private router: Router, private stayService: StayService) {}

  ngOnInit(): void {}

  editStay(userid: number) {
    this.router.navigateByUrl('pages/stays/update/' + userid);
  }

  deleteStay(id: number) {
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
        this.stayService.delete(id);

        this.router.navigateByUrl('pages/users');
      } else {
        Swal.fire('Cancelled', 'the stay is safe', 'error');
      }
    });
  }
}
