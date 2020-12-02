import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDropdownComponent } from './progress-dropdown.component';

fdescribe('ProgressDropdownComponent', () => {
  let component: ProgressDropdownComponent;
  let fixture: ComponentFixture<ProgressDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create porgress drop down', () => {
    expect(component).toBeTruthy();
  });

  it("should be called openLabelMenu", () => {

    const spy = spyOn(component, 'openLabelMenu').and.callThrough();
    component.openLabelMenu();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.openLabelMenu).toBeTruthy;

  });
 

  it('should be called changeStatus', () => {
    const spy = spyOn(component, 'changeStatus').and.callThrough();
    const evt = {
      target: {
        innerText: '',
      },
    };
    component.changeStatus(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.changeStatus).toBeTruthy;
  });
  
  // it('should be called clickout', () => {
  //   const spy = spyOn(component, 'clickout').and.callThrough();
  //   const evt =""
  //   component.clickout(evt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.clickout).toBeTruthy;
  // });
});
