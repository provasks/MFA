import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileErrorDailogComponent } from './file-error-dailog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
fdescribe('FileErrorDailogComponent', () => {
  let component: FileErrorDailogComponent;
  let fixture: ComponentFixture<FileErrorDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileErrorDailogComponent ],
      imports:[ MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileErrorDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create file error dialog', () => {
    expect(component).toBeTruthy();
  });
  it("should be called ngOnInit", () => {

    const spy = spyOn(component,'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  
  }); 
  // it('closeDialog should be called', () => {

  //   const spy = spyOn(component,'closeDialog').and.callThrough();
  //   component.closeDialog();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.closeDialog).toBeTruthy;
    
  // });
});
