import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportDialogComponent } from './export-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


fdescribe('ExportDialogComponent', () => {
  let component: ExportDialogComponent;
  let fixture: ComponentFixture<ExportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportDialogComponent ],
      imports:[ MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create export component', () => {
    expect(component).toBeTruthy();
  });

   it('should enable bucket', () => {
    const spy = spyOn(component,'enableBucket').and.callThrough();
    component.enableBucket(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.enableBucket).toBeTruthy;
  });
  it('should enable start date', () => {
    const spy = spyOn(component,'enableStartDate').and.callThrough();
    component.enableStartDate(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.enableStartDate).toBeTruthy;
  });
  it('should enable end date', () => {
    const spy = spyOn(component,'enableEndDate').and.callThrough();
    component.enableEndDate(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.enableEndDate).toBeTruthy;
  });
  it('should enable assignee', () => {
    const spy = spyOn(component,'enableAssignee').and.callThrough();
    component.enableAssignee(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.enableAssignee).toBeTruthy;
  });
  it('should enable Label', () => {
    const spy = spyOn(component,'enableLabel').and.callThrough();
    component.enableLabel(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.enableLabel).toBeTruthy;
  });
  // it('should select start date', () => {
  //   const spy = spyOn(component,'selectedStartDate').and.callThrough();
  //   component.selectedStartDate(true);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.selectedStartDate).toBeTruthy;
  // });
  // it('should select end date', () => {
  //   const spy = spyOn(component,'selectedEndDate').and.callThrough();
  //   component.selectedEndDate(true);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.selectedEndDate).toBeTruthy;
    
  // });
  it('ngOnInit should be called', () => {

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
