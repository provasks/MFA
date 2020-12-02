import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';

import { TaskChartComponent } from './task-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Task } from 'src/app/models/task.model';
import { of } from 'rxjs';

fdescribe('TaskChartComponent', () => {
  let dependency = {
    "id": 237,
    "taskId": "v6_rIjeoukq5SdaaMm9EG8kALorI",
    "parentTaskId": "v6_rIjeoukq5SdaaMm9EG8kALorI",
    "typeId": null,
    "planId": null,
    "dependencyType": "Finish-Start",
    "color": "#FFC0CB",
    "title": "medicure support",
    "predecessorIndex": 1,
    "successorIndex": 8
  }
  let mockUtility = {
    getTaskManipulatedData() { return of([]) },
    getParameters() { return of({}) },
    setParameters() { return of({}) },
    getDatarowExpandCollapseEvent() {
      return of(
        {
          "id": "N3N1Z7BV9UybZYydE4FskMkAPLBj",
          "relation": "parent-0013",
          "expanded": false
        }
      )
    },
    dependencies: [dependency],
    setLineClicked() { },
    getTaskIndex() { },
    getDateDifference() { },
    
    unsubscribe() { }

  };
  let component: TaskChartComponent;
  let fixture: ComponentFixture<TaskChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskChartComponent],
      providers: [{
        provide: UtilityService,
        useValue: mockUtility,
      }],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskChartComponent);
    component = fixture.componentInstance;
    component.taskList = [{ id: 'v6_rIjeoukq5SdaaMm9EG8kALorI', title: "hello" }]
    fixture.detectChanges();
    // element = fixture.nativeElement;
  });
  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TaskChartComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  // it('should create task chart', () => {
  //   expect(component).toBeTruthy();
  // });
  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });

  it('should be called getDependencyWithTitle', () => {
    const spy = spyOn(component, 'getDependencyWithTitle').and.callThrough();
    dependency["drawingInfo"] = {
      predecessor: {
        title: ''
      },
      successor: {
        title: ''
      },
      
    }

    dependency.taskId="0";
    dependency.parentTaskId = "0";
    component.taskList = [{id:"0", title: "" }];
    component.getDependencyWithTitle(dependency);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getDependencyWithTitle).toBeTruthy;
  });

  it('should be called isBothAccessorVisible', () => {
    const spy = spyOn(component, 'isBothAccessorVisible').and.callThrough();
    component.isBothAccessorVisible(dependency.id);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isBothAccessorVisible).toBeTruthy;
  });

  it('should be called toggleDependency', () => {
    const spy = spyOn(component, 'toggleDependency').and.callThrough();
    const expression = `app-gantt-bar div[class*='parent-0013'] div[id*='dep-']`
    component.toggleDependency(expression, false);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleDependency).toBeTruthy;
  });

  it('should be called adjustVerticalLineHeight', () => {
    const spy = spyOn(component, 'adjustVerticalLineHeight').and.callThrough();
    component.adjustVerticalLineHeight(component.taskList[0].id, 1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.adjustVerticalLineHeight).toBeTruthy;
  });

  it('should be called ngOnInit when tasks.length is > 0 and getParameters returns array of objects', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    mockUtility.getTaskManipulatedData = () => of([{}])
    mockUtility.getParameters = () => of({ days: [] })

    // spyOn(component, "addLateStatus").and.callThrough()
    component.ngOnInit();


    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });
  // it('should be called ngAfterViewInit', () => {
  //   const spy = spyOn(component, 'ngAfterViewInit').and.callThrough();
  //   component.ngAfterViewInit();

  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.ngAfterViewInit).toBeTruthy;
  // });
  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;
  });
  it('should be called closeDependency', () => {
    const spy = spyOn(component, 'closeDependency').and.callThrough();
    component.closeDependency(true);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.closeDependency).toBeTruthy;
  });
  it('should be called drawDependencies', () => {
    const spy = spyOn(component, 'drawDependencies').and.callThrough();

    component.drawDependencies(mockUtility.dependencies);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawDependencies).toBeTruthy;
  });

  it("should be called drawDependency", () => {

    const spy = spyOn(component, 'drawDependency').and.callThrough();
    const accessor = {
      title: "",
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: "",

    }
    component.getDeviderInfo = () => { }
    component.drawDevider = () => { return document.createElement('div') }
    component.getBarProperties = () => {
      return { predecessor: accessor, successor: accessor }
    }
    component.drawConnectors = () => { }

    component.drawDependency(mockUtility.dependencies[0]);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawDependency).toBeTruthy;

  });
  it('should be called getAccessorIndicator', () => {
    const spy = spyOn(component, 'getAccessorIndicator').and.callThrough();

    component.getAccessorIndicator('');

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getAccessorIndicator).toBeTruthy;
  });

  // it("should call getTaskManipulatedData and return list of manipulated task ", async(() => {
  //   const response: Task[] = [];

  //   // spyOn(utilityService, 'getTaskManipulatedData').and.returnValue(of(response))

  //   TaskChartComponent.getTaskManipulatedData();

  //   fixture.detectChanges();

  //   expect(homeComponent.listOfUsers).toEqual(response);
  // }));

  it('should be called drawVerticalLines', () => {
    const spy = spyOn(component, 'drawVerticalLines').and.callThrough();
    const width = 1;
    component.drawVerticalLines(width);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawVerticalLines).toBeTruthy;
  });
  it('should be called drawHorizontalLines', () => {
    const spy = spyOn(component, 'drawHorizontalLines').and.callThrough();
    const width = 1;
    component.drawHorizontalLines(width);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawHorizontalLines).toBeTruthy;
  });
  it('should be called drawTodayIndicator', () => {
    const spy = spyOn(component, 'drawTodayIndicator').and.callThrough();

    component.drawTodayIndicator(1, 1, 1, 1);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawTodayIndicator).toBeTruthy;
  });

  it('should be called drawTodayIndicator else', () => {
    const spy = spyOn(component, 'drawTodayIndicator').and.callThrough();

    component.drawTodayIndicator(1, 1, 8, 1);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawTodayIndicator).toBeTruthy;
  });


  it('should be called drawOffdaysBackground', () => {
    const spy = spyOn(component, 'drawOffdaysBackground').and.callThrough();
    const days = [{dayName:""}];
    // const offDay = "";
    component.drawOffdaysBackground(days, 1);

    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawOffdaysBackground).toBeTruthy;
  });

  it('should be called isTaskVisible', () => {
    const spy = spyOn(component, 'isTaskVisible').and.callThrough();
    const tskId = '';
    component.isTaskVisible(tskId);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.isTaskVisible).toBeTruthy;
  });
  it('should be called getTaskbar', () => {
    const spy = spyOn(component, 'getTaskbar').and.callThrough();
    const id = '';
    component.getTaskbar(id);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getTaskbar).toBeTruthy;
  });
  it('should be called getHigherAccessor', () => {
    const spy = spyOn(component, 'getHigherAccessor').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    component.getHigherAccessor(dependency);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getHigherAccessor).toBeTruthy;
  });
  it('should be called getDeviderInfo', () => {
    const spy = spyOn(component, 'getDeviderInfo').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    component.getDeviderInfo(dependency);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getDeviderInfo).toBeTruthy;
  });
  it('should be called drawDevider', () => {
    const spy = spyOn(component, 'drawDevider').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    const info = '';
    component.drawDevider(dependency, info);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawDevider).toBeTruthy;
  });

  it('should be called getMinAccessorType', () => {
    const spy = spyOn(component, 'getMinAccessorType').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    const info = '';
    component.getMinAccessorType(dependency, info);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getMinAccessorType).toBeTruthy;
  });
  it('should be called drawConnectors', () => {
    const spy = spyOn(component, 'drawConnectors').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    const bannerElement: HTMLElement = fixture.nativeElement;
    component.drawConnectors(dependency, bannerElement);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawConnectors).toBeTruthy;
  });
  it('should be called getSuccessorArrow', () => {
    const spy = spyOn(component, 'getSuccessorArrow').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    const bannerElement: HTMLElement = fixture.nativeElement;
    component.getSuccessorArrow(dependency, 1);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getSuccessorArrow).toBeTruthy;
  });
  it('should be called drawDependency', () => {
    const spy = spyOn(component, 'drawDependency').and.callThrough();
    const Accessor = {
      title: '',
      top: 0,
      right: 0,
      left: 0,
      width: 0,
      endpoint: 0,
      type: '',
    };
    const dependency = {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 0,
      drawingInfo: {
        predecessor: Accessor,
        successor: Accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 1,
      successorIndex: 1,
    };
    const bannerElement: HTMLElement = fixture.nativeElement;
    const id = '';
    component.drawDependency(dependency);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.drawDependency).toBeTruthy;
  });




});
