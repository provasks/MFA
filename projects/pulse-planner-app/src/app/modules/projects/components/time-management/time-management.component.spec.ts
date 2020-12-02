import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { TimeManagementComponent } from './time-management.component';
import { of } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';

// {
//   assigneeEfforts: [],
//   assignedUsers: [{
//     days:2,
//     totalHours:10,
//     hours:3
//   }]
// }
// let mockTasks = {
//   estimations: {
//     id: '',
//     assigneeEfforts: [{ days: 2 }],
//     estimatedHours: 0,
//     assignedHours: 0,
//   }
// }
let mockUtility = {
  // resources: [{ displayName: "" }, { displayName: "b" }],
  getDateTaskManagement() {
    return of({
      startDate: '',
      dueDate: ''
    });
    // return of({ days: [] });

  },
  isMangerRole() {
    return true
  },
  getAssigneeData() {
    return of([])
  },
  unsubscribe(){}
}

fdescribe('TimeManagementComponent', () => {
  let component: TimeManagementComponent;
  let fixture: ComponentFixture<TimeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeManagementComponent],
      providers: [
        {
          provide: UtilityService, useValue: mockUtility
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create time management', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should create time management daysCount', () => {
    const spy = spyOn(component, 'daysCount').and.callThrough();
    // component.estimations = estimations;
    component.actualStartDate = '08-10-2020';
    component.actualEndDate = '08-12-2020';
    component.durationDays = '';
    component.assignedUsers = [{ 'hours': 10, 'totalHours': 20 }];
    component.daysCount();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.daysCount).toBeTruthy;
  });


  it('should create time management tableDataFormat', () => {
    const spy = spyOn(component, 'tableDataFormat').and.callThrough();
    // component.estimations = estimations;
    component.assignedUsers = [{ 'hours': 10, 'totalHours': 20, displayName: '' }];
    component.assignedList = [{ 'hours': 10, 'totalHours': 20, displayName: '' }];
    component.assignedHours = 10;
    component.unAssignedHours = 4;
    component.tableDataFormat();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.tableDataFormat).toBeTruthy;
  });

  it('should create time management tableDataFormat when assignedUsers.length > assignedList.length', () => {
    const spy = spyOn(component, 'tableDataFormat').and.callThrough();
    // component.estimations = estimations;
    component.assignedUsers = [{ 'hours': 10, 'totalHours': 20, displayName: 'a' }, { 'hours': 10, 'totalHours': 20, displayName: 'b' }];
    component.assignedList = [{ 'hours': 10, 'totalHours': 20, displayName: '' }];
    component.assignedHours = 10;
    component.unAssignedHours = 4;
    component.tableDataFormat();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.tableDataFormat).toBeTruthy;
  });
  it('should create time management hoursChange', () => {
    const spy = spyOn(component, 'hoursChange').and.callThrough();
    component.durationDays = 20;
    component.assignedUsers = [{ 'hours': 10, 'totalHours': 20 }];
    component.hoursChange('', 0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.hoursChange).toBeTruthy;
  });


  it('should create time management totalHoursChange', () => {
    const spy = spyOn(component, 'totalHoursChange').and.callThrough();
    component.durationDays = 20;
    component.assignedUsers = [{ 'hours': 10, 'totalHours': 20 }];
    component.totalHoursChange(12.12, 0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.totalHoursChange).toBeTruthy;
  });


  it('should create time management toggleAssignees', () => {
    const spy = spyOn(component, 'toggleAssignees').and.callThrough();
    component.assignListEnable = true;
    component.toggleAssignees();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleAssignees).toBeTruthy;
  });


  // it('should create time management prepareObj', () => {
  //   const spy = spyOn(component, 'prepareObj').and.callThrough();
  //   component.estimations = estimations;
  //   component.assignedUsers = assignedUsers;
  //   component.prepareObj();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.prepareObj).toBeTruthy;
  // });


  it('should create time management computeHours', () => {
    let mockUsers = [{ 'hours': 10, 'totalHours': 20 }];
    // let tags:HTMLCollection
    // for(let i=0; i<2; i++){
    //   tags.append(document.createElement('div'))
    // }
    // spyOn(document, 'getElementsByClassName').and.callFake(()=>tags); 
    const spy = spyOn(component, 'computeHours').and.callThrough();
    component.assignedUsers = mockUsers;
    component.individualHours = 2;
    component.unAssignedHours = 0;
    component.computeHours();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.computeHours).toBeTruthy;
  });

  it('should create time management updateEstimates', () => {
    const spy = spyOn(component, 'updateEstimates').and.callThrough();
    component.estimations = {};
    component.updateEstimates();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateEstimates).toBeTruthy;
  });

  it('should create time management clearHours', () => {
    const spy = spyOn(component, 'clearHours').and.callThrough();
    // component.estimations = estimations;
    component.estimatedHours = 0;
    component.assignedHours = 10;
    // component.assignedUsers = assignedUsers;
    component.clearHours();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clearHours).toBeTruthy;
  });

  it('should create time management assignedHoursChamge', () => {
    const spy = spyOn(component, 'assignedHoursChamge').and.callThrough();
    component.assignedHours = 0;
    const ev ={
      target: {
        value: 10
      }
    }
    component.assignedHoursChamge(ev);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.assignedHoursChamge).toBeTruthy;
  });

  it('should create time management assignedHoursChamge when e.targe.value is empty', () => {
    const spy = spyOn(component, 'assignedHoursChamge').and.callThrough();
     component.assignedHours = 0;
    const ev ={
      target: {
        value: ''
      }
    }
    component.assignedHoursChamge(ev);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.assignedHoursChamge).toBeTruthy;
  });
  it('should create time management assignedHours is gretter than e.targe.value is empty', () => {
    const spy = spyOn(component, 'assignedHoursChamge').and.callThrough();
    // component.estimations = estimations;
    component.assignedHours = 10;
    const ev ={
      target: {
        value: 3
      }
    }
    component.assignedHoursChamge(ev);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.assignedHoursChamge).toBeTruthy;
  });

  it("should be called ngOnDestroy", () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;

  });
  // it('should create time management isMangerRole', () => {
  //   const spy = spyOn(component, 'isMangerRole').and.callThrough();
  //   component.estimations = estimations;
  //   component.isMangerRole('');
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.isMangerRole).toBeTruthy;
  // });




  // it('should create time management', () => {
  //   expect(component).toBeTruthy();

  // });


});

