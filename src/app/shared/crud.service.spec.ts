import { TestBed } from '@angular/core/testing';

import { CrudService } from '../shared/crud.service';

describe('Crud.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudService = TestBed.get(CrudService);
    expect(service).toBeTruthy();
  });
});
