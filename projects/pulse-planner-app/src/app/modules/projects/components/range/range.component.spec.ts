import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeComponent } from './range.component';

fdescribe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create range component', () => {
    expect(component).toBeTruthy();
  });
  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();

    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });
  it('should be called updatePercentage', () => {
    const spy = spyOn(component, 'updatePercentage').and.callThrough();
    const evt = {
      target: {
        innerText: '',
      },
    };
    component.updatePercentage(evt);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updatePercentage).toBeTruthy;
  });
});
