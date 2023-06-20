import { TestBed } from '@angular/core/testing';

import { StructureServiceService } from './structure-service.service';

describe('StructureServiceService', () => {
  let service: StructureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StructureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
