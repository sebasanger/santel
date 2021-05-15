import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryProductsComponent } from './entry-products.component';

describe('EntryProductsComponent', () => {
  let component: EntryProductsComponent;
  let fixture: ComponentFixture<EntryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
