import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionsTableComponent } from './consumptions-table.component';

describe('ConsumptionsTableComponent', () => {
  let component: ConsumptionsTableComponent;
  let fixture: ComponentFixture<ConsumptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
