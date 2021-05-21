import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegistersComponent } from './view-registers.component';

describe('ViewRegistersComponent', () => {
  let component: ViewRegistersComponent;
  let fixture: ComponentFixture<ViewRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRegistersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
