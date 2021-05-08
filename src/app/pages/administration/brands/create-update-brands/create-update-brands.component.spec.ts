import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBrandsComponent } from './create-update-brands.component';

describe('CreateUpdateBrandsComponent', () => {
  let component: CreateUpdateBrandsComponent;
  let fixture: ComponentFixture<CreateUpdateBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
