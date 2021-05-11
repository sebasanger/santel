import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditRoomPriceComponent } from './create-edit-room-price.component';

describe('CreateEditRoomPriceComponent', () => {
  let component: CreateEditRoomPriceComponent;
  let fixture: ComponentFixture<CreateEditRoomPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditRoomPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditRoomPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
