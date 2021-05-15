import { TestBed } from '@angular/core/testing';

import { EntryProductService } from './entry-product.service';

describe('EntryProductService', () => {
  let service: EntryProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
