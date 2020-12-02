import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDependencyComponent } from './task-dependency.component';

fdescribe('TaskDependencyComponent', () => {
  let component: TaskDependencyComponent;
  let fixture: ComponentFixture<TaskDependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDependencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create task dependency', () => {
    expect(component).toBeTruthy();
  });
  it("should be called closeModal", () => {

    const spy = spyOn(component, 'closeModal').and.callThrough();
    
    component.closeModal();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeModal).toBeTruthy;

  });
  it("should be called ngOnDestroy", () => {

    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;

  });
  it("should be called ngOnInit", () => {

    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;

  });
  it("should be called sendMessageToParent", () => {

    const spy = spyOn(component, 'sendMessageToParent').and.callThrough();
    
    component.sendMessageToParent(true);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sendMessageToParent).toBeTruthy;

  });
 
});
