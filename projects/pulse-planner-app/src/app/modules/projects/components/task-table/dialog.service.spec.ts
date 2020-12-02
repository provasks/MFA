import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

fdescribe('DialogService', () => {
  let service: DialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:
      [      
        MatDialogModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
    });
    service = TestBed.inject(DialogService);
  });

  it('dialog service should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Open confirm dialog should be created', () => {

    const service: DialogService = TestBed.get(DialogService);
    expect(service.openConfirmDialog).toBeTruthy();
    
  });
  // it('Open Confirm Dialog should be called', () => {

  //   const service: DialogService = TestBed.get(DialogService);
  //   expect(service.openExportDialog).toBeTruthy();

  //   const spy = spyOn(service,'openConfirmDialog').and.callThrough();
  
  //   service.openConfirmDialog();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(service.openConfirmDialog).toBeTruthy;
    
  // });
  // it('Open export dialog should be called', () => {

  //   const service: DialogService = TestBed.get(DialogService);
  //   expect(service.openExportDialog).toBeTruthy();

  //   const spy = spyOn(service,'openExportDialog').and.callThrough();
  
  //   service.openExportDialog();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  
  //   expect(service.openExportDialog).toBeTruthy;
    
  // })

  

});
