import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRegisterComponent } from './create-update-register.component';

describe('CreateUpdateRegisterComponent', () => {
  let component: CreateUpdateRegisterComponent;
  let fixture: ComponentFixture<CreateUpdateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
