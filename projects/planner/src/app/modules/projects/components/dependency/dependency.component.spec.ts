import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DependencyComponent } from './dependency.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ApiService } from 'src/app/api.service';
import { of } from 'rxjs';

fdescribe('DependencyComponent', () => {
  let component: DependencyComponent;
  let fixture: ComponentFixture<DependencyComponent>;
  const accessor = {
    title: '',
    top: 0,
    right: 0,
    left: 0,
    width: 0,
    endpoint: 0,
    type: '',
  };
  let data = {
    position: {
      left: '605.84387px',
      top: '360px',
    },
    arrow: {
      left: '0px',
    },
    dependency: {
      id: 0,
      taskId: '',
      parentTaskId: '',
      dependencyType: '',
      typeId: 1,
      drawingInfo: {
        predecessor: accessor,
        successor: accessor,
      },
      correction: 0,
      higherAccessor: '',
      leftAccessor: '',
      predecessorIndex: 0,
      successorIndex: 0,
    },
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DependencyComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: {
            getLineClicked() {
              return of(data)
            },
            setdependencyModalFlag() {
              return { subscribe: () => {} };
            },

            unsubscribe() {
              return;
            },
          },
        },
        {
          provide: ApiService,
          useValue: {
            deleteDependency() {
              return of('')
            },
            unsubscribe() {
              return;
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });

  it('should be called deleteDependancy', () => {
    const spy = spyOn(component, 'deleteDependancy').and.callThrough();
    const evt = {
      type: '',
      stopPropagation: function () {},
    };
    const id = 1;
    component.deleteDependancy(id, evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.deleteDependancy).toBeTruthy;
  });
  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;
  });
});
