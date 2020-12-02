import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDependencyComponent } from './table-dependency.component';
import { HttpClientModule } from '@angular/common/http';

fdescribe('TableDependencyComponent', () => {
  let component: TableDependencyComponent;
  let fixture: ComponentFixture<TableDependencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDependencyComponent ],
      imports:
      [
       HttpClientModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create task dependency', () => {
    expect(component).toBeTruthy();
  });
   it("should be called getDependenciesData", () => {

    const spy = spyOn(component, 'getDependenciesData').and.callThrough();
    component.getDependenciesData();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.getDependenciesData).toBeTruthy;

  });
  it("should be called deleteDependancy", () => {

    const spy = spyOn(component, 'deleteDependancy').and.callThrough();
    var dep={
      id:1
    }
    component.deleteDependancy(dep);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.deleteDependancy).toBeTruthy;

  });
  it("should be called sendMessageToParent", () => {

    const spy = spyOn(component, 'sendMessageToParent').and.callThrough();
    
    component.sendMessageToParent();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.sendMessageToParent).toBeTruthy;

  });
  it("should be called ngOnDestroy", () => {

    const spy = spyOn(component, 'ngOnDestroy').and.callThrough();
    
    component.ngOnDestroy();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnDestroy).toBeTruthy;

  });
  it("should be called ngOnInit", () => {

    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;

  });
});
