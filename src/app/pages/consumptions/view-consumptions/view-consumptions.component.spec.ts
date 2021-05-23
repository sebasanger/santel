import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConsumptionsComponent } from './view-consumptions.component';

describe('ViewConsumptionsComponent', () => {
  let component: ViewConsumptionsComponent;
  let fixture: ComponentFixture<ViewConsumptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConsumptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConsumptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
