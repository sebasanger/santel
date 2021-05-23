import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStaysComponent } from './view-stays.component';

describe('ViewStaysComponent', () => {
  let component: ViewStaysComponent;
  let fixture: ComponentFixture<ViewStaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewStaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
