import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskTableComponent } from './task-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../../../../api.service';
import { of, Observable } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { DialogService } from './dialog.service';
import { doesNotReject } from 'assert';
import { MaterialModule } from 'src/app/modules/material/material.module';
import * as moment from 'moment';
import { title } from 'process';

fdescribe('TaskTableComponent', () => {
  let component: TaskTableComponent;
  let fixture: ComponentFixture<TaskTableComponent>;

  let mockUtitlity = {
    setExcelUploadFlag() { },
    getExcelUploadFlag() { return of(false) },
    getdependencyModalFlag() { return of(true) },
    getparentTaskName() { return of(true) },
    setTaskTableFlag() { },
    setparentTaskName() { },
    isMangerRole() { return true },
    unsubscribe() { },
    manipulateData() { return [{ appliedCategories: [] }] },
    getMinimumValue() { },
    getMaximumValue() { },
    getTaskDeleted() { return of(false) },
    setTaskDeleted() { return of(false) },
    getTaskAdded() { return of(false) },
    setTaskAdded() { return of(false) },
    setCalenderStartDate() { },
    setCalenderEndDate() { },
    setTaskManipulatedData() { },
    setDatarowExpandCollapseEvent() { },
    setTaskData() { },
    projectStartDate: '01/02/2020',
    projectDueDate: '01/02/2020',
    isoDateToMoment(date: string) { return moment(new Date(date), "MM/DD/YYYY"); }
  }

  let mockTask = {
    id: "1",
    title: "title",
    description: "description",
    bucket: "bucket",
    startDate: '01/101/2020',
    dueDate: '01/101/2020',
    assignees: [{ displayName: 'provas' }],
    status: "status",
    progressValue: 10,
    comments: ["a", "b"],
    checklist: ["a", "b"],
    percentComplete: 10,
    // subTasks?: Task[];
    hierarchy: "normal", //normal, parent, child
    relation: "1-2",
    parentTaskId: "1",
    expanded: false
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTableComponent],
      imports: [
        MaterialModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: UtilityService,
          useValue: mockUtitlity,
        },
        {
          provide: ApiService,
          useValue: {
            getAllTasks() { return of([]); },
            // getAllTasks() { return of([{ id: "1" }, { id: "2" }]); },
            getLabelNames() { return of({ a: '', b: "b" }) },
            deleteTask() { return of('') }
          },
        },
        {
          provide: DialogService,
          useValue: {
            openExportDialog() {
              return of({
                startDateSelected: '01/01/2020',
                endDateSelected: '05/01/2020',
                bucketEnabled: true,
                startDateEnabled: true,
                endDateEnabled: true,
                assgineeEnabled: true,
                labelEnabled: true
              })
            }
          },
        }

      ],
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTableComponent);
    component = fixture.componentInstance;
    spyOn(component, 'getTaskDetails');
    fixture.detectChanges();
  });

  // it('should create task table component', () => {
  //   const spy = spyOn(component, 'getTaskDetails').and.callFake(function () { });
  //   component.selectedColumns = ["a", 'b']
  //   expect(component).toBeTruthy();
  //   expect(spy).toBeDefined();
  // });

  it("should be called getBoxes when there is no hyphen", () => {
    const spy = spyOn(component, 'getBoxes').and.callThrough();
    component.getBoxes("hello");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getBoxes).toBeTruthy;
  });

  it("should be called getBoxes  when there is hyphen", () => {
    const spy = spyOn(component, 'getBoxes').and.callThrough();
    component.getBoxes("1-2");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getBoxes).toBeTruthy;
  });


  it("should be called getAssignees", () => {
    const spy = spyOn(component, 'getAssignees').and.callThrough();
    component.getAssignees([]);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAssignees).toBeTruthy;
  });

  // it("should be called getTaskDetails ", () => {
  //   const spy = spyOn(component, 'getTaskDetails').and.callThrough();
  //   const date = {
  //     isSame(){}
  //   }
  //   component.startDateList = [date];
  //   component.endDateList = [date]
  //   component.getTaskDetails();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.getTaskDetails).toBeTruthy;
  // });

  it("should be called createLabelData", () => {
    const spy = spyOn(component, 'createLabelData').and.callThrough();
    component.createLabelData('category1');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.createLabelData).toBeTruthy;
  });

  // it("should be called doExpandCollapse", () => {
  //   const spy = spyOn(component, 'doExpandCollapse').and.callThrough();
  //   component.doExpandCollapse({});
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.doExpandCollapse).toBeTruthy;
  // });

  it("should be called expandParent", () => {
    const spy = spyOn(component, 'expandParent').and.callThrough();
    component.rowData = [mockTask];
    component.expandParent(mockTask);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.expandParent).toBeTruthy;
  });

  it("should be called collapseParents", () => {
    const spy = spyOn(component, 'collapseParents').and.callThrough();
    component.rowData = [mockTask];
    component.collapseParents(mockTask);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.collapseParents).toBeTruthy;
  });

  it("should be called editTaskData", () => {
    const spy = spyOn(component, 'editTaskData').and.callThrough();
    component.editTaskData(mockTask);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.editTaskData).toBeTruthy;
  });

  it("should be called applyFilterBucket", () => {
    const spy = spyOn(component, 'applyFilterBucket').and.callThrough();
    component.applyFilterBucket("asdf");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterBucket).toBeTruthy;
  });

  it("should be called applyFilterStartDate when event type is keyup", () => {
    const spy = spyOn(component, 'applyFilterStartDate').and.callThrough();
    component.filterStartDateList = [mockUtitlity.isoDateToMoment('01/01/2020"'), mockUtitlity.isoDateToMoment('02/01/2020"')]
    component.applyFilterStartDate("keyup", "01/01/2020");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterStartDate).toBeTruthy;
  });

  it("should be called applyFilterStartDate  when event type is not keyup", () => {
    const spy = spyOn(component, 'applyFilterStartDate').and.callThrough();
    component.filterStartDateList = [mockUtitlity.isoDateToMoment('01/01/2020"'), mockUtitlity.isoDateToMoment('02/01/2020"')]
    component.applyFilterStartDate("keydown", "01/01/2020");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterStartDate).toBeTruthy;
  });

  it("should be called applyFilterEndDate when event Type is keyup", () => {
    const spy = spyOn(component, 'applyFilterEndDate').and.callThrough();
    component.filterEndDateList = [mockUtitlity.isoDateToMoment('01/01/2020"'), mockUtitlity.isoDateToMoment('02/01/2020"')]
    component.applyFilterEndDate("keyup", "01/01/2020");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterEndDate).toBeTruthy;
  });

  it("should be called applyFilterEndDate when event Type is not keyup", () => {
    const spy = spyOn(component, 'applyFilterEndDate').and.callThrough();
    component.filterEndDateList = [mockUtitlity.isoDateToMoment('01/01/2020"'), mockUtitlity.isoDateToMoment('02/01/2020"')]
    component.applyFilterEndDate("keydown", "01/01/2020");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterEndDate).toBeTruthy;
  });

  it("should be called getLabelName", () => {
    const spy = spyOn(component, 'getLabelName').and.callThrough();
    component.labelNamesData = { foo: "bar" }
    component.getLabelName("foo");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getLabelName).toBeTruthy;
  });

  it("should be called editTaskData", () => {
    const spy = spyOn(component, 'editTaskData').and.callThrough();
    // component.labelNamesData = {foo:"bar"}
    component.editTaskData(mockTask);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.editTaskData).toBeTruthy;
  });

  it("should be called applyFilterAssignee", () => {
    const spy = spyOn(component, 'applyFilterAssignee').and.callThrough();
    component.filterAssigneeList = ["foo", "bar"]
    component.applyFilterAssignee("foo");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterAssignee).toBeTruthy;
  });

  it("should be called applyFilterLabel", () => {
    const spy = spyOn(component, 'applyFilterLabel').and.callThrough();
    component.filterLabelList = ["foo", "bar"]
    component.applyFilterLabel("foo");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.applyFilterLabel).toBeTruthy;
  });

  it("should be called onFilterChange when type is bucket", () => {
    const spy = spyOn(component, 'onFilterChange').and.callThrough();
    const event = { value: ["foo", "bar"] }
    component.originalRowData = [{ bucket: ["foo", "bar"] }]
    component.onFilterChange(event, 'bucket');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onFilterChange).toBeTruthy;
  });

  it("should be called onFilterChange when type is assignee", () => {
    const spy = spyOn(component, 'onFilterChange').and.callThrough();
    const event = { value: ["foo", "bar"] }
    component.originalRowData = [{ assignees: ["foo", "bar"] }]
    component.onFilterChange(event, 'assignee');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onFilterChange).toBeTruthy;
  });

  it("should be called onFilterChange when type is startDate", () => {
    const spy = spyOn(component, 'onFilterChange').and.callThrough();
    const event = { value: [mockUtitlity.isoDateToMoment("01/01/2000"), mockUtitlity.isoDateToMoment("02/01/2000")] }
    component.originalRowData = [{ startMoment: mockUtitlity.isoDateToMoment("01/01/2000") }, { startMoment: mockUtitlity.isoDateToMoment("02/01/2000") }]
    component.onFilterChange(event, 'startDate');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onFilterChange).toBeTruthy;
  });

  it("should be called onFilterChange when type is endDate", () => {
    const spy = spyOn(component, 'onFilterChange').and.callThrough();
    const event = { value: [mockUtitlity.isoDateToMoment("01/01/2000"), mockUtitlity.isoDateToMoment("02/01/2000")] }
    component.originalRowData = [{ dueMoment: mockUtitlity.isoDateToMoment("01/01/2000") }, { dueMoment: mockUtitlity.isoDateToMoment("02/01/2000") }]
    component.onFilterChange(event, 'endDate');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onFilterChange).toBeTruthy;
  });

  it("should be called onFilterChange when type is label", () => {
    const spy = spyOn(component, 'onFilterChange').and.callThrough();
    const event = { value: ["foo", "bar"] }
    component.originalRowData = [{ label: ["foo", "bar"] }]
    component.onFilterChange(event, 'label');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.onFilterChange).toBeTruthy;
  });

  it("should be called clear type is bucket", () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    const event = { value: ["foo", "bar"] }
    const type = 'bucket';
    spyOn(component, 'onFilterChange').and.callFake((event, type) => { })
    component.clear(type);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  it("should be called clear type is startDate v ", () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    const event = { value: [mockUtitlity.isoDateToMoment("01/01/2000"), mockUtitlity.isoDateToMoment("02/01/2000")] }
    const type = 'startDate';
    spyOn(component, 'onFilterChange').and.callFake((event, type) => { })
    component.clear(type);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  it("should be called clear type is assignee", () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    const event = { value: ["foo", "bar"] }
    const type = 'assignee';
    spyOn(component, 'onFilterChange').and.callFake((event, type) => { })
    component.clear(type);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  it("should be called clear type is endDate", () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    const event = { value: [mockUtitlity.isoDateToMoment("01/01/2000"), mockUtitlity.isoDateToMoment("02/01/2000")] }
    const type = 'endDate';
    spyOn(component, 'onFilterChange').and.callFake((event, type) => { })
    component.clear(type);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  it("should be called clear type is label", () => {
    const spy = spyOn(component, 'clear').and.callThrough();
    const event = { value: ["foo", "bar"] }
    const type = 'label';
    spyOn(component, 'onFilterChange').and.callFake((event, type) => { })
    component.clear(type);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clear).toBeTruthy;
  });

  // it("should be called viewFilterPane when opened is true", () => {
  //   const spy = spyOn(component, 'viewFilterPane').and.callThrough();
  //   component.filterPaneOpened = [true]
  //   component.viewFilterPane(true, 0);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.viewFilterPane).toBeTruthy;
  // });

  // it("should be called viewFilterPane when opened is false", () => {
  //   const spy = spyOn(component, 'viewFilterPane').and.callThrough();
  //   component.filterPaneOpened = [true]
  //   component.viewFilterPane(false, 0);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.viewFilterPane).toBeTruthy;
  // });

  it("should be called addDependency", () => {
    const spy = spyOn(component, 'addDependency').and.callThrough();
    // component.filterPaneOpened = [true]
    component.addDependency('foo');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addDependency).toBeTruthy;
  });

  it("should be called addTaskDataModal", () => {
    const spy = spyOn(component, 'addTaskDataModal').and.callThrough();
    // component.filterPaneOpened = [true]
    component.addTaskDataModal({ id: 0, title: 'asdf' });
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addTaskDataModal).toBeTruthy;
  });

  it("should be called closeAddEditModal", () => {
    const spy = spyOn(component, 'closeAddEditModal').and.callThrough();
    // component.filterPaneOpened = [true]
    component.closeAddEditModal(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeAddEditModal).toBeTruthy;
  });

  it("should be called isMangerRole", () => {
    const spy = spyOn(component, 'isMangerRole').and.callThrough();
    // component.filterPaneOpened = [true]
    component.isMangerRole('foo');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isMangerRole).toBeTruthy;
  });
  it("should be called ngOnChanges", () => {
    const spy = spyOn(component, 'ngOnChanges').and.callThrough();
    component.ngOnChanges();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnChanges).toBeTruthy;
  });

  it("should be called exportToExcel", () => {
    const spy = spyOn(component, 'exportToExcel').and.callThrough();
    component.originalRowData = [
      {
        startMoment: mockUtitlity.isoDateToMoment('01/01/2020'),
        dueMoment: mockUtitlity.isoDateToMoment('05/01/2020'),
        assignees: [{ displayName: "foo" }, { displayName: "bar" }],
        title: "asdf",
        bucket: 'qa'

      }
    ]
    component.exportToExcel();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.exportToExcel).toBeTruthy;
  });

});



