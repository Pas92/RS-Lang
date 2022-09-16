import { TestBed } from '@angular/core/testing';

import { StatisticHandlerService } from './statistic-handler.service';

describe('StatisticHandlerService', () => {
  let service: StatisticHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
