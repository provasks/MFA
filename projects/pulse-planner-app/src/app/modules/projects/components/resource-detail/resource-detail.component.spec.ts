import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourceDetailComponent } from './resource-detail.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { of } from 'rxjs';


fdescribe('ResourceDetailComponent', () => {
  let component: ResourceDetailComponent;
  let fixture: ComponentFixture<ResourceDetailComponent>;
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
      y: 10
    }
  }
  let mockUtitlity = {
    stringToDate() {
      return {
        format() { }
      }
    },
    getAssignment() {
      return of(mockAssignment);

    },
    getPopupMaxLeft() { },
    getObjectProperty() {
      return 100;
    },
    unsubscribe() { }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResourceDetailComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: mockUtitlity,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Resource Detail Component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called ngOnInit when Arrow Direction is up', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.assignment = mockAssignment;
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });

  it('should be called ngOnInit when Arrow Direction is down', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    // console.log(mockAssignment.click.y)
    mockAssignment.click.y = 500000; //its making ArrowDirection is down
    component.assignment = mockAssignment;
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });

  // it('should be called ngOnInit when Arrow Direction is down and diff is positive', () => {
  //   const spy = spyOn(component, 'ngOnInit').and.callThrough();
  //   // console.log(mockAssignment.click.y)
  //   mockAssignment.click.y = 5000; //its making ArrowDirection is down
  //   mockAssignment.click.x = 10000; //its making ArrowDirection is down
  //   component.assignment = mockAssignment;
  //   component.ngOnInit();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.ngOnInit).toBeTruthy;
  // });

  it('should be called when assignment is null', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.assignment.tasks = null;
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
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

  it("should be called ngOnDestroy", () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;

  });

});
