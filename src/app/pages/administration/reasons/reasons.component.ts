import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Reason } from 'src/app/models/reason.model';
import { ReasonService } from 'src/app/services/reason.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-reasons',
  templateUrl: './reasons.component.html',
  styleUrls: ['./reasons.component.scss'],
})
export class ReasonsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'reason'];
  public dataSource: MatTableDataSource<Reason>;

  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  reasons$: Observable<Reason[]>;

  constructor(private reasonService: ReasonService) {
    this.reasons$ = reasonService.entities$;
    this.loading$ = reasonService.loading$;
  }

  ngOnInit(): void {
    this.getReasons();
    let registers$ = this.reasons$.subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
    });

    this.subscription.add(registers$);
  }

  add(reason: Reason) {
    this.reasonService.add(reason);
  }

  delete(reason: Reason) {
    this.reasonService.delete(reason.id);
  }

  getReasons() {
    this.reasonService.getAll();
  }

  update(reason: Reason) {
    this.reasonService.update(reason);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
