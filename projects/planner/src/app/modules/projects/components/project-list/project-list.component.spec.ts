import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListComponent } from './project-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import * as d3 from 'd3';
import { of } from 'rxjs';
import { ApiService } from 'src/app/api.service';

let p: HTMLElement;
fdescribe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  let mocApiService = {
    getAllProjectsWithGroupId(){
      return of([
        {
          groupMembers: [],
          title: "",
          id: "",
          groupId: "",
          percentComplete: "",
          completedTasks: [],
          totalTasks: "",
          daysLeft: "",
    
        }
      ])
    },

    getMyGroups() {
      return  of([{
        id: 1,
        displayName: ""
      }]);
    },

    unsubscribe() {
      return;
    },

  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectListComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: ApiService,
          useValue: mocApiService
          
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create project list component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called getLoggedInUserGroups', () => {
    const spy = spyOn(component, 'getLoggedInUserGroups').and.callThrough();
        
    component.getProjectList();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getProjectList).toBeTruthy;
  });
  it('should be called profileDpName', () => {
    const spy = spyOn(component, 'profileDpName').and.callThrough();

    component.profileDpName('alex');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.profileDpName).toBeTruthy;
  });
  it('should be called setUserBg', () => {
    const spy = spyOn(component, 'setUserBg').and.callThrough();

    component.setUserBg('john kim');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.setUserBg).toBeTruthy;
  });

  it('should be called setUserBg', () => {
    const spy = spyOn(component, 'setUserBg').and.callThrough();

    component.setUserBg('john kim test');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.setUserBg).toBeTruthy;
  });

  it('should be called setUserBg', () => {
    const spy = spyOn(component, 'setUserBg').and.callThrough();

    component.setUserBg('john');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.setUserBg).toBeTruthy;
  });

  it('should be called navigateToProjects', () => {
    const spy = spyOn(component, 'navigateToProjects').and.callThrough();

    component.navigateToProjects(10, 1, 'UI');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.navigateToProjects).toBeTruthy;
  });
  it('should be called intToRGB', () => {
    const spy = spyOn(component, 'intToRGB').and.callThrough();

    component.intToRGB(10);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.intToRGB).toBeTruthy;
  });
  it('should be called hashCode', () => {
    const spy = spyOn(component, 'hashCode').and.callThrough();

    component.hashCode('abcdef');
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.hashCode).toBeTruthy;
  });
  it('should call ngondestroy', () => {
    expect(component.ngOnDestroy()).toBeTrue;
  });
  it('should be called animationpieChart', () => {
    const spy = spyOn(component, 'animationpieChart').and.callThrough();

    const project = 'UI';
    const count = 0;
    const d3 = {
      select: '',
    };
    let chart0: HTMLElement;

    component.animationpieChart(chart0, project, count);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.animationpieChart).toBeTruthy;
  });
  it('should be called ngOnDestroy', () => {
    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();

    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;
  });
});
