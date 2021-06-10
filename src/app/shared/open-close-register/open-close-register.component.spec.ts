import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCloseRegisterComponent } from './open-close-register.component';

describe('OpenCloseRegisterComponent', () => {
  let component: OpenCloseRegisterComponent;
  let fixture: ComponentFixture<OpenCloseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenCloseRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCloseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
