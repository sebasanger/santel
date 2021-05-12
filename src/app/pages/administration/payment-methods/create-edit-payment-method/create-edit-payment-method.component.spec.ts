import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPaymentMethodComponent } from './create-edit-payment-method.component';

describe('CreateEditPaymentMethodComponent', () => {
  let component: CreateEditPaymentMethodComponent;
  let fixture: ComponentFixture<CreateEditPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
