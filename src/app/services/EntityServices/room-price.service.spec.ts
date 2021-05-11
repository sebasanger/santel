import { TestBed } from '@angular/core/testing';

import { RoomPriceService } from './room-price.service';

describe('RoomPriceService', () => {
  let service: RoomPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
