import { TestBed } from '@angular/core/testing';

import { ExcelService } from './excel.service';

fdescribe('ExcelService', () => {
  let service: ExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelService);
  });

  it('Excel Service should be created', () => {
    expect(service).toBeTruthy();
  });

  
  it('Excel file with sample data has to be created', () => {

    const service: ExcelService = TestBed.get(ExcelService);

    expect(service).toBeTruthy();
    service.exportAsExcelFile([{
      "taskname": "sample",
      "bucket":"UI",
    }], "sample-data")

  });
  it('Excel file with no data has to be created', () => {

    const service: ExcelService = TestBed.get(ExcelService);

    expect(service).toBeTruthy();
    service.exportAsExcelFile([], "no-data")

  });
});
