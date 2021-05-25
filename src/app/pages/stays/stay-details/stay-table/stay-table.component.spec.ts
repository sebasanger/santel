import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StayTableComponent } from './stay-table.component';

describe('StayTableComponent', () => {
  let component: StayTableComponent;
  let fixture: ComponentFixture<StayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
