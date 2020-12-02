import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UtilityService } from '../../../../shared/services/utility.service';
import { SearchTaskDependencyComponent } from './search-task-dependency.component';
import { HttpClientModule } from '@angular/common/http';
import * as moment from 'moment';
import { ApiService } from 'src/app/api.service';
import { of } from 'rxjs';
fdescribe('SearchTaskDependencyComponent', () => {
  let component: SearchTaskDependencyComponent;
  let fixture: ComponentFixture<SearchTaskDependencyComponent>;
  let mocApiService = {
    getDependencyTypes(){
      return of([])
    },

    addDependencyTask() {
      return of([])
    },

    unsubscribe() {
      return;
    }

  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTaskDependencyComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: UtilityService,
          useValue: {
            getTaskManipulatedData() {
              return { subscribe: () => {} };
            },

            setdependencyUpdate() {
              return { subscribe: () => {} };
            },
            
            unsubscribe() {
              return;
            },
          },

          
          
        },

        {
          provide: ApiService, useValue: mocApiService
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTaskDependencyComponent);
    component = fixture.componentInstance;
    component.parentTaskData = { startDate: '' };
    fixture.detectChanges();
  });

  // it('should create search task component', () => {
  //   component.predecessorStartDate = moment();
  //   expect(component).toBeTruthy();
  // });

  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    // component.parentTaskData = {};
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

  it('should be called sendMessageToParent', () => {
    const spy = spyOn(component, 'sendMessageToParent').and.callThrough();
    component.sendMessageToParent();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sendMessageToParent).toBeTruthy;
  });
  it('should be called openLabelMenu', () => {
    const spy = spyOn(component, 'openLabelMenu').and.callThrough();
    component.openLabelMenu();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.openLabelMenu).toBeTruthy;
  });

  it('should be called addDependency', () => {
    const spy = spyOn(component, 'addDependency').and.callThrough();
    
    component.dependenciesList = [{name: "test", id:0}]
    component.addDependency();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addDependency).toBeTruthy;
  });

  it('should be called toggleDependency', () => {
    const spy = spyOn(component, 'toggleDependency').and.callThrough();
    component.toggleDependency();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleDependency).toBeTruthy;
  });

  it('should be called filterTaskData', () => {
    const spy = spyOn(component, 'filterTaskData').and.callThrough();
    const evt = {
      target:{
        value:""
      }
    };
    component.dependecyTableDataTemp=[{title:"",}]
    component.filterTaskData(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.filterTaskData).toBeTruthy;
  });

  it('should be called selectDependecyTitle', () => {
    const spy = spyOn(component, 'selectDependecyTitle').and.callThrough();
    const tsk = {title: "test", id:0, startDate: "", dueDate: ""};
    component.taskContainerFlag  = false;
    component.isSetDependency = false;
    component.predecessorDueDate = 10;
    component.successorStartDate = 10;
    component.selectDependecyTitle(tsk);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.selectDependecyTitle).toBeTruthy;
  });
  it('should be called dependencyChange', () => {
    const spy = spyOn(component, 'dependencyChange').and.callThrough();
    const dep = {
      id: '',
      name: '',
    };
    const evt = '';
    component.dependencyChange(evt, dep);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.dependencyChange).toBeTruthy;
  });
  it('should be called activeType', () => {
    const spy = spyOn(component, 'activeType').and.callThrough();
  
    const dep = {
      name: 'test',
    };
    component.dependencyValue = 'test';
    component.activeType(dep);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.activeType).toBeTruthy;
  });

  
  it('should be called clickout', () => {
    const spy = spyOn(component, 'clickout').and.callThrough();
    component.isOpenMenu = true;
    let event = {
      target: {
        classList: ["label-update-btn"]
      }
    }
    
    component.clickout(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.clickout).toBeTruthy;
  });


  it('should be called cancel', () => {
    const spy = spyOn(component, 'cancel').and.callThrough();
    component.dependencyValue = '';
    component.dependencyTypeId = 1;
    component.dependenciesList = [{name:"", id:0}];
    component.dependenciesList[0].name = "";
    component.dependenciesList[0].id = 1;

    component.searchTask = "";

    component.cancel();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.cancel).toBeTruthy;
  });
});
