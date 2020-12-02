import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

fdescribe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const privateSpy = spyOn<any>(component, "sampleMethod");
    // component.sampleMethod = () => { return 'a' }
    // component.sampleMethod();
    // expect(component.sampleMethod).toBe('a');
    // const spy = spyOn(component, 'sampleMethod').and.callFake(()=>'');
    expect(component).toBeTruthy();
    // expect(spy).toBeDefined();
    // expect(spy).toHaveBeenCalled();
  });

  // it("should be called sampleMethod", () => {
  //   const spy = spyOn(component, 'sampleMethod').and.callThrough();
  //   component.sampleMethod();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.sampleMethod).toBeTruthy;
  // });

});
