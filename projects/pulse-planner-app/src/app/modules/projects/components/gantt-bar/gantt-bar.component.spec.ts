import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttBarComponent } from './gantt-bar.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
fdescribe('GanttBarComponent', () => {
  let component: GanttBarComponent;
  let fixture: ComponentFixture<GanttBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GanttBarComponent],
      providers: [{ provide: UtilityService, useValue: {
        getDateDifference() {
          return {
            subscribe: () => {},
          };
        
        },
      } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ghantt bar', () => {
    expect(component).toBeTruthy();
  });
  it('should be called getTaskStatusClass', () => {
    const spy = spyOn(component, 'getTaskStatusClass').and.callThrough();

    component.getTaskStatusClass('completed');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getTaskStatusClass).toBeTruthy;
  });
  it('should be called getTaskStatusClass in progress', () => {
    const spy = spyOn(component, 'getTaskStatusClass').and.callThrough();

    component.getTaskStatusClass('in-progress');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getTaskStatusClass).toBeTruthy;
  });
  it('should be called getTaskStatusClass late', () => {
    const spy = spyOn(component, 'getTaskStatusClass').and.callThrough();

    component.getTaskStatusClass('late');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getTaskStatusClass).toBeTruthy;
  });
  it('should be called getTaskStatusClass not started', () => {
    const spy = spyOn(component, 'getTaskStatusClass').and.callThrough();

    component.getTaskStatusClass('not-started');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getTaskStatusClass).toBeTruthy;
  });
 
  it("should be called getWidth", () => {

    const spy = spyOn(component, 'getWidth').and.callThrough();
    component.task={
      id: "",
      title: "",
      description: "",
      bucket: "",
      startDate: "",
      dueDate: "",
      assignees: [],
      status: "",
      progressValue: 0,
      comments: [],
      checklist: [],
      percentComplete: 0,
      subTasks: [],
      hierarchy: "",
      relation:"",
      parentTaskId: "",
      expanded: false,
    }

    component.getWidth(component.task);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getWidth).toBeTruthy;

  });
  // it("should be called getLeftPosition", () => {

  //   const spy = spyOn(component, 'getLeftPosition').and.callThrough();
  //   component.task={
  //     id: "",
  //     title: "",
  //     description: "",
  //     bucket: "",
  //     startDate: "",
  //     dueDate: "",
  //     assignees: [],
  //     status: "",
  //     progressValue: 0,
  //     comments: [],
  //     checklist: [],
  //     percentComplete: 0,
  //     subTasks: [],
  //     hierarchy: "",
  //     relation:"",
  //     parentTaskId: "",
  //     expanded: false,
  //   }
  //   component.utility.calenderStartDate
  //   component.getLeftPosition();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.getLeftPosition).toBeTruthy;

  // });
  // it('should be called ngOnChanges', () => {
  //   const spy = spyOn(component, 'ngOnChanges').and.callThrough();

  //    component.task={
  //     id: "",
  //     title: "",
  //     description: "",
  //     bucket: "",
  //     startDate: "",
  //     dueDate: "",
  //     assignees: [],
  //     status: "",
  //     progressValue: 0,
  //     comments: [],
  //     checklist: [],
  //     percentComplete: 0,
  //     subTasks: [],
  //     hierarchy: "",
  //     relation:"",
  //     parentTaskId: "",
  //     expanded: false,
  //   }
  //   component.ngOnChanges();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.ngOnChanges).toBeTruthy;
  // });
});
