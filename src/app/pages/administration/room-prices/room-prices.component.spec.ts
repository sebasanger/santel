import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPricesComponent } from './room-prices.component';

describe('RoomPricesComponent', () => {
  let component: RoomPricesComponent;
  let fixture: ComponentFixture<RoomPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomPricesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
