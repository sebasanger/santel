import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStayComponent } from './create-update-stay.component';

describe('CreateUpdateStayComponent', () => {
  let component: CreateUpdateStayComponent;
  let fixture: ComponentFixture<CreateUpdateStayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateStayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateStayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
