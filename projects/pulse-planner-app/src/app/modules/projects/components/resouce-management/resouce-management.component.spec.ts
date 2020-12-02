import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResouceManagementComponent } from './resouce-management.component';
import { ApiService } from 'src/app/api.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { of } from 'rxjs';
import { Resource } from 'src/app/models/resource.model';
declare var $: any;

let task: [{ title: string, hours: number }] = [{ title: '', hours: 0 }]
let mockAssignment = {
  class: '',
  date: '',
  dateLong: '',
  taskCount: 0,
  hourCount: 0,
  tasks: task,
  assignee: {
    name: 'string',
    photo: 'string'
  },
  totalHours: 0,
  click: {
    x: 0,
    y: 0
  }
}
let mockResource: Resource = {
  "id": "bd990ec7-4ad1-428f-8552-326c5649661c",
  "email": "ben@trianzsandbox.onmicrosoft.com",
  "displayName": "Ben Andrews",
  "photo": "",
  "notStartedTasks": 0,
  "completedTasks": 2,
  "pendingTasks": 0,
  "lateTasks": 9,
  "tasks": [
    { "id": "5Rxt0huZjk2LcP9XwXzqRskAEXND", "title": "testing task7", "status": "Late", "dueDateTime": "2020-08-14T00:00:00+00:00", "days": 12, "hours": 0, "totalHours": 0 },
    { "id": "lAPNn6z2g0GCsPq3y1NCHskAM5Ql", "title": "test api time", "status": "Late", "startDateTime": "2020-07-31T00:00:00+00:00", "dueDateTime": "2020-08-17T00:00:00+00:00", "days": 12, "hours": 3.17, "totalHours": 38 }
  ],
  dayWiseTasks: [{ date: "a", taskCount: 0, totalHours: 0, hourCount: 0 }]

}

let mockUtility = {
  resources: [{ displayName: "" }, { displayName: "b" }],
  getParameters() {
    return of({});
    // return of({ days: [] });

  },
  showHideResourceDetails() {
    return of(false);
  },
  filter() { },
  unsubscribe() { },
  setAssignment() { },
  getCalenderDays() { return [{ dayValue: 1, monthValue: "m", year: "2000" }] },
  isoDateToMoment(a) { }
}
fdescribe('ResouceManagementComponent', () => {
  let component: ResouceManagementComponent;
  let fixture: ComponentFixture<ResouceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResouceManagementComponent],
      providers: [
        { provide: ApiService, useValue: {} },
        {
          provide: UtilityService, useValue: mockUtility
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResouceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Resource Management Component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called onClick', () => {
    const spy = spyOn(component, 'onClick').and.callThrough();
    const event = {
      type: '',
      stopPropagation: function () { }
    };
    spyOn(event, 'stopPropagation').and.callThrough();
    component.onClick(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onClick).toBeTruthy;

  });

  it('should be called filterAssignee() when event.value.length is 0', () => {
    const spy = spyOn(component, 'filterAssignee').and.callThrough();
    const event = {
      value: []
    };
    component.filterAssignee(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.filterAssignee).toBeTruthy;
  });


  it('should be called filterAssignee() when event.value.length is more thant 0', () => {
    const spy = spyOn(component, 'filterAssignee').and.callThrough();
    const event = {
      value: [1, 2]
    };
    component.filterAssignee(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.filterAssignee).toBeTruthy;
  });


  // it('should be called getCalenderParameters()', () => {
  //   const spy = spyOn(component, 'getCalenderParameters').and.callThrough();
  //   mockUtility.getParameters = () => {
  //     return of({ days: [{ dayName: 'sa' }, { dayName: 'su' }] })
  //   }
  //   component.filteredResources = [{
  //     id: "dfd",
  //     dayWiseTasks: [mockAssignment],
  //     displayName: "hello"
  //   }]
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.getCalenderParameters).toBeTruthy;
  // });


  it('should be called closeResourceManagement()', () => {
    const spy = spyOn(component, 'closeResourceManagement').and.callThrough();
    const event = {
      value: [1, 2]
    };
    component.closeResourceManagement(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeResourceManagement).toBeTruthy;
  });

  it('should be called onAvailabilityClick()', () => {
    const spy = spyOn(component, 'onAvailabilityClick').and.callThrough();
    const event = {
      x: 1,
      y: 1,
      stopPropagation() { }
    };
    component.onAvailabilityClick(mockAssignment, mockResource, event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onAvailabilityClick).toBeTruthy;
  });

  
  it('should be called getAvailabilityValue', () => {
    const spy = spyOn(component, 'getAvailabilityValue').and.callThrough();
    const day = { taskCount: 0, hourCount: 0 }
    component.getAvailabilityValue(day);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAvailabilityValue).toBeTruthy;
  });

  it('should be called formatAvailablityValue', () => {
    const spy = spyOn(component, 'formatAvailablityValue').and.callThrough();
    const value = 3;
    component.formatAvailablityValue(value);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.formatAvailablityValue).toBeTruthy;
  });

  

  it('should be called onScroll', () => {
    const spy = spyOn(component, 'onScroll').and.callThrough();
    const event = {};
    component.onScroll(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onScroll).toBeTruthy;
  });


  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;
  });
  // it('should be called filterAssignee', () => {
  //   const spy = spyOn(component, 'filterAssignee').and.callThrough();
  //   const evt = {
  //     value: 1,
  //   };
  //   component.filterAssignee(evt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.filterAssignee).toBeTruthy;
  // });
  // it('should be called closeResourceManagement', () => {
  //   const spy = spyOn(component, 'closeResourceManagement').and.callThrough();
  //   const evt = {
  //     value: 1,
  //   };
  //   component.closeResourceManagement(evt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.closeResourceManagement).toBeTruthy;
  // });
  // it('should be called getAvailabilityValue', () => {
  //   const spy = spyOn(component, 'getAvailabilityValue').and.callThrough();
  //   const day = {};
  //   component.getAvailabilityValue(day);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.getAvailabilityValue).toBeTruthy;
  // });
  // it('should be called formatAvailablityValue', () => {
  //   const spy = spyOn(component, 'formatAvailablityValue').and.callThrough();

  //   component.formatAvailablityValue(1);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.formatAvailablityValue).toBeTruthy;
  // });

});
