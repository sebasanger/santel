import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaysTableComponent } from './stays-table.component';

describe('StaysTableComponent', () => {
  let component: StaysTableComponent;
  let fixture: ComponentFixture<StaysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaysTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
