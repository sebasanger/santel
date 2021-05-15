import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEntryProductComponent } from './create-update-entry-product.component';

describe('CreateUpdateEntryProductComponent', () => {
  let component: CreateUpdateEntryProductComponent;
  let fixture: ComponentFixture<CreateUpdateEntryProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateEntryProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateEntryProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
