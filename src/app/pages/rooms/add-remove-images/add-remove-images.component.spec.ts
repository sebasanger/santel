import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveImagesComponent } from './add-remove-images.component';

describe('AddRemoveImagesComponent', () => {
  let component: AddRemoveImagesComponent;
  let fixture: ComponentFixture<AddRemoveImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRemoveImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
