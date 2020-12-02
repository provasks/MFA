import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { GanttViewComponent } from './gantt-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddEditTaskComponet } from '../AddEditTask/add-edit-task.component';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Resource } from 'src/app/models/resource.model';
import { MatTabChangeEvent } from '@angular/material/tabs';

fdescribe('GanttViewComponent', () => {
  let component: GanttViewComponent;
  let fixture: ComponentFixture<GanttViewComponent>;
  let activatedRoute: ActivatedRoute;
  let utilityService: UtilityService;
  let mockUtility = {
    getTaskDeleted() { return of(false) },
    setTaskDeleted() { return of(false) },
    getTaskAdded() { return of(false) },
    setTaskAdded() { return of(false) },
    getTaskTableFlag() {
      return of(true);
    },
    getParameters() {
      return of({});
    },
    reloadTasks() {
      return of();
    },
    setHeaderTop() {
      return of();
    },
    isMangerRole() {
      return of();
    },
    printToImage() {
      return of();
    },
    setExcelUploadFlag() {
      return of(true);
    },
    getdependencyModalFlag() {
      return of(true);
    },
    isoDateToMoment() { },
    getCalenderDays() { return [{ dayValue: 1, monthValue: "m", year: "2000" }] },
    unsubscribe() { },
    groupId: "asdf",
    planId: "hello",
    setShowHideResourceDetails(){ return of(false) }
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GanttViewComponent, AddEditTaskComponet],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ApiService,
          useValue: {
            getResourceAvailability() {
              return of([]);
            },
            getAllTasks() {
              return of([]);
            },
            unsubscribe() { },
          },
        },
        {
          provide: UtilityService,
          useValue: mockUtility
        },

        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
        {
          provide: Title,
          useValue: {
            setTitle() {
              return of();
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create gantt view', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should be called loadTasks', () => {
    const spy = spyOn(component, 'loadTasks').and.callThrough();
    mockUtility.groupId="test";
    component.loadTasks();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.loadTasks).toBeTruthy;
  });

  it('should be called addAvailabilityData()', () => {
    const spy = spyOn(component, 'addAvailabilityData').and.callThrough();
    component.addAvailabilityData(mockResource);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addAvailabilityData).toBeTruthy;
  });

  // it('should be called initGrid', () => {
  //   const spy = spyOn(component, 'initGrid').and.callThrough();
  //   const days: any = [];
  //   component.initGrid(days);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.initGrid).toBeTruthy;
  // });

  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    mockUtility.planId = "asdfasdf";
    mockUtility.groupId = "asdfasdf";
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });

  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;
  });

  it('should be called exportPNG', () => {
    const spy = spyOn(component, 'exportPNG').and.callThrough();

    component.exportPNG();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.exportPNG).toBeTruthy;
  });

  it('should be called toggleExportViewer', () => {
    const spy = spyOn(component, 'toggleExportViewer').and.callThrough();
    const evt = '';
    component.toggleExportViewer(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleExportViewer).toBeTruthy;
  });

  it('should be called closeDependenceModal', () => {
    const spy = spyOn(component, 'closeDependenceModal').and.callThrough();
    const evt = '';
    component.closeDependenceModal(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeDependenceModal).toBeTruthy;
  });
  it('should be called closeAddEditModal', () => {
    const spy = spyOn(component, 'closeAddEditModal').and.callThrough();
    const evt = '';
    component.closeAddEditModal(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeAddEditModal).toBeTruthy;
  });
  it('should be called modalClose', () => {
    const spy = spyOn(component, 'modalClose').and.callThrough();

    component.modalClose();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.modalClose).toBeTruthy;
  });
  it('should be called dependencyModal', () => {
    const spy = spyOn(component, 'dependencyModal').and.callThrough();
    const evt = '';
    component.dependencyModal(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.dependencyModal).toBeTruthy;
  });
  it('should be called subTaskModal', () => {
    const spy = spyOn(component, 'subTaskModal').and.callThrough();
    const evt = '';
    component.subTaskModal(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.subTaskModal).toBeTruthy;
  });

  it('should be called editTaskModal', () => {
    const spy = spyOn(component, 'editTaskModal').and.callThrough();

    component.editTaskModal();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.editTaskModal).toBeTruthy;
  });
  it('should be called addTaskModal', () => {
    const spy = spyOn(component, 'addTaskModal').and.callThrough();

    component.addTaskModal();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addTaskModal).toBeTruthy;
  });
  it('should be called isMangerRole', () => {
    const spy = spyOn(component, 'isMangerRole').and.callThrough();
    const name = '';
    component.isMangerRole(name);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isMangerRole).toBeTruthy;
  });
  it('should be called toggleResourceManagement', () => {
    const spy = spyOn(component, 'toggleResourceManagement').and.callThrough();
    const evt = {
      type: '',
      stopPropagation: function () { },
    };
    component.toggleResourceManagement(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleResourceManagement).toBeTruthy;
  });
  it('should be called ngAfterViewInit', () => {
    const spy = spyOn(component, 'ngAfterViewInit').and.callThrough();
    component.allTasks = [{title: "test", id: "0"}];
    const eventx = {
      type: '',
      stopPropagation: function () { }
    };
    spyOn(eventx, 'stopPropagation').and.callThrough();
    component.handle = {
      nativeElement: {
        onclick : function(){
          let eventx = {
            type: '',
            stopPropagation: function () { }
          };
          return eventx;
        }
      }
    }
    component.ngAfterViewInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngAfterViewInit).toBeTruthy;
  });


  it('should be called clear', () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    component.clear();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  it('should be called exportToExcel', () => {
    const spy = spyOn(component, 'exportToExcel').and.callThrough();

    component.exportToExcel();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.exportToExcel).toBeTruthy;
  });
  it('should be called clearView', () => {
    const spy = spyOn(component, 'clearView').and.callThrough();
    let event = {
      type: "click",
      source: {
        value: [{title: "test"}]
      }
    };
    let evType= "view";
    component.selectedDisplayedColumns = [];
    component.selectedColumns = [];
    component.filteredColumns = "test";
    component.showColumns(event);
    component.clearView("");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clearView).toBeTruthy;
  });
  it('should be called closeResourceManagement', () => {
    const spy = spyOn(component, 'closeResourceManagement').and.callThrough();
    component.closeResourceManagement();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeResourceManagement).toBeTruthy;
  });
  it('should be called showColumns', () => {
    const spy = spyOn(component, 'showColumns').and.callThrough();
    component.selectedColumns = []
    const evt = {
      type: '',
      source: {
        value: ["test"],
      },
    };
    component.showColumns(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.showColumns).toBeTruthy;
  });
  
  // it('should be called toggleColumnViewer', () => {
  //   const spy = spyOn(component, 'toggleColumnViewer').and.callThrough();
  //   const evt = true;
    
  //   component.toggleColumnViewer(evt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.toggleColumnViewer).toBeTruthy;
  // });

  // it('should be called initDayWiseTasks', () => {
  //   const spy = spyOn(component, 'initDayWiseTasks').and.callThrough();
  //   const days = [{dayName: "Monday"}, {dayName: "Tuesday"}];
  //   component.initDayWiseTasks(days);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.initDayWiseTasks).toBeTruthy;
  // });

    it('should be called onClick', () => {
    const spy = spyOn(component, 'onClick').and.callThrough();
    // const evt:MouseEvent = spyOn(component,'onClick' ).and.callThrough();
    mockUtility.setShowHideResourceDetails();
    component.onClick();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onClick).toBeTruthy;
  });

  // it('should be called onClick', () => {
  //   const spy = spyOn(component, 'onClick').and.callThrough();
  //   const event = {
  //     type: '',
  //     stopPropagation: function () { }
  //   };
  //   spyOn(event, 'stopPropagation').and.callThrough();
  //   component.onClick(event);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.onClick).toBeTruthy;

  // });

  // it('should be called tabChanged', () => {
  //   const spy = spyOn(component, 'tabChanged').and.callThrough();
  //   let tabChangeEvent: MatTabChangeEvent;
  //   // tabChangeEvent[MatTab] = {"textLabel": "test"}
  //   // component.router.navigate([""])
  //   component.groupId ="";
  //   component.projectName = "";
  //   component.tabChanged(tabChangeEvent);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.tabChanged).toBeTruthy;
  // });

  

});
