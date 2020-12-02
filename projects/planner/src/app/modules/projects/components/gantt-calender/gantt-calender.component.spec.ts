import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GanttCalenderComponent } from './gantt-calender.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { of } from 'rxjs';
import * as moment from 'moment';

fdescribe('GanttCalenderComponent', () => {
  let component: GanttCalenderComponent;
  let fixture: ComponentFixture<GanttCalenderComponent>;
  const task = {
    "id": "8nAtZUyDYU28WUyWunJqwMkAEUlI",
    "parentTaskId": null,
    "planId": null,
    "groupId": null,
    "description": null,
    "title": "API Integration",
    "bucket": "UI Development",
    "bucketId": "rmoUUvmG406Kw5VIqpZPgMkAEKDj",
    "startDate": "15/06/2020",
    "createdDateTime": "2020-07-01T05:35:07.5666216+00:00",
    "dueDateTime": "2020-06-19T00:00:00+00:00",
    "startDateTime": "2020-06-15T00:00:00+00:00",
    "dueDate": "19/06/2020",
    "status": "Completed",
    "eTag": "W/\"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAcCc=\"",
    "percentComplete": 100,
    "assignees": [
      {
        "id": "658746d7-e1bb-47c9-a014-232ce11122f7",
        "email": "Ramya.Hosavalike@trianzsandbox.onmicrosoft.com",
        "displayName": "Ramya Hosavalike",
        "photo": null
      },
      {
        "id": "404a2579-44c3-4181-92ba-3dd1363a56ca",
        "email": "david@trianzsandbox.onmicrosoft.com",
        "displayName": "David Longmuir",
        "photo": ""
      }
    ],
    "checkLists": null,
    "references": null,
    "dependancies": [],
    "appliedCategories": {
      "category1": false,
      "category2": true,
      "category3": true,
      "category4": true,
      "category5": false,
      "category6": false
    },
    "hierarchy": "parent",
    "relation": "parent-0001",
    "startMoment": "2020-06-14T18:30:00.000Z",
    "dueMoment": "2020-06-18T18:30:00.000Z",
    "expanded": true
  }

  let mockUtitlity = {
    getTaskManipulatedData() {
      return of([task])
    },
    getCalenderDays() {
      return []
    },
    getDistinctYears() {
      return []
    },
    getHeaderTop(){return of(1)},
    unsubscribe(){},
    getToday(date){
      return moment(new Date(date), 'DD/MM/YYYY');
    },
    setParameters(value){},
    getDistinctMonths(){}
   

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GanttCalenderComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: mockUtitlity,
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create gantt component', () => {
    expect(component).toBeTruthy();
  });

  it("should be called ngOnInit", () => {
    const spy = spyOn(component,'ngOnInit').and.callThrough();
    let mockUtitlity = {
      getTaskManipulatedData() {
        return of([])
      }
    }
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  }); 

  // it('should create gantt component when ManipulatedData is empty', () => {
  //   let mockUtitlity = {
  //     getTaskManipulatedData() {
  //       return of([])
  //     }
  //   }
  //   expect(component).toBeTruthy();
  // });

  it("should be called getMonths", () => {
    const spy = spyOn(component,'getMonths').and.callThrough();
    var year="2020"
    component.getMonths(year);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getMonths).toBeTruthy;
  }); 

  it("should be called ngOnInit", () => {

    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;

  });
  it("should be called ngOnDestroy", () => {

    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;

  });

  it("should be called getMonths", () => {

    const spy = spyOn(component, 'getMonths').and.callThrough();

    expect(component.getMonths).toBeTruthy;

  });
});
