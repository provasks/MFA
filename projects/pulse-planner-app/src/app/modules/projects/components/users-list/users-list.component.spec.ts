import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListComponent } from './users-list.component';
import { UtilityService } from 'src/app/shared/services/utility.service';
fdescribe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let service: UtilityService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListComponent],
      providers: [
        {
          provide: UtilityService,
          useValue: {
            getCommentsSearch() {
              return { subscribe: () => {} };
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
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create user list', () => {
    component.usersList = [];
    component.tempUsersList = [];
    expect(component).toBeTruthy();
  });
  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
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

  it('should be called searchAssignee', () => {
    const spy = spyOn(component, 'searchAssignee').and.callThrough();
    component.usersList = [];
    component.tempUsersList = [];

    component.searchAssignee();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.searchAssignee).toBeTruthy;
  });
  it('should be called addComments', () => {
    const spy = spyOn(component, 'addComments').and.callThrough();
    const evt = {
      displayName: '',
    };
    component.addComments(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addComments).toBeTruthy;
  });
});
