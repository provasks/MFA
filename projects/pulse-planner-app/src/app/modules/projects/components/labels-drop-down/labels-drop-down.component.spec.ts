import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelsDropDownComponent } from './labels-drop-down.component';
import { ApiService } from '../../../../api.service';
import { UtilityService } from '../../../../shared/services/utility.service';
import { subscribeOn } from 'rxjs/operators';

fdescribe('LabelsDropDownComponent', () => {
  let component: LabelsDropDownComponent;
  let fixture: ComponentFixture<LabelsDropDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LabelsDropDownComponent],
      providers: [
        { provide: ApiService, useValue: {} },
        {
          provide: UtilityService, useValue: {
            saveLabelNamesUpdate() {
              return { subscribe: () => { } };
            },
            unsubscribe() {
              return;
            },

          }
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelsDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create label component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called openLabelMenu', () => {
    const spy = spyOn(component, 'openLabelMenu').and.callThrough();

    component.openLabelMenu();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.openLabelMenu).toBeTruthy;
  });
  it('should be called updateLabel', () => {
    const spy = spyOn(component, 'updateLabel').and.callThrough();
    let count = 0;

    const event = {
      target: {
        checked: false
      }
    }

    component.displayLabels = [];
    
    component.appliedCategories = {
      category1: "Red",
      category2: "Yellow color",
      category3: "Red",
      category4: "Green color",
      category5: "Blue",
      category6: "Purple",
    }

    component.labelData = [{ value: true, name: "" }];

    component.updateLabel(event, 0);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.updateLabel).toBeTruthy;
  });

  it('should be called changeLabel', () => {
    const spy = spyOn(component, 'changeLabel').and.callThrough();
    component.appliedCategories = {
      event: {
        source: {
          value: ""
        }
      }
    }
    const event = {
      source: {
        _selected: ""
      }

    }
    component.changeLabel(event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.changeLabel).toBeTruthy;
  });

  it('should be called addLabelName', () => {
    const spy = spyOn(component, 'addLabelName').and.callThrough();
    component.labelNamesData = [{ category1: "red" }];
    let category = "category1";
    component.addLabelName(category);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.addLabelName).toBeTruthy;
  });

  it('should be called labelNameUpdate', () => {
    const spy = spyOn(component, 'labelNameUpdate').and.callThrough();
    component.labelNamesData = [{ category1: "red" }];
    let category = "category1";
    let event = {
      target: {
        value: ""
      }
    }
    component.labelNameUpdate(category, event);
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.labelNameUpdate).toBeTruthy;
  });





  it('should be called selectedLabels', () => {
    const spy = spyOn(component, 'selectedLabels').and.callThrough();
    component.appliedCategories = { "category1": "red" };
    component.addLabelName = function() {
      return 
    }
    component.selectedLabels("");
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.selectedLabels).toBeTruthy;
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

  it("should be called ngOnInit", () => {

    const spy = spyOn(component,'ngOnInit').and.callThrough();
    component.appliedCategories = {
      category1: "Red",
      category2: "Yellow color",
      category3: "Red",
      category4: "Green color",
      category5: "Blue",
      category6: "Purple",
    }
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  
  }); 


  // it('should be called saveLabelNamesUpdate', () => {
  //   const spy = spyOn(component, 'saveLabelNamesUpdate').and.callThrough();  
  //   component.isLabelsEdit = false;
  //   // component.addLabelName("");
  //   let category1 = "category1";

  //   component.saveLabelNamesUpdate();
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.saveLabelNamesUpdate).toBeTruthy;
  // });

  // it('should be called changeLabel', () => {
  //   const spy = spyOn(component, 'changeLabel').and.callThrough();
  //   const evt = {
  //     source: {
  //       value: 0,
  //     },
  //   };
  //   component.changeLabel(evt);
  //   expect(spy).toBeDefined();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.changeLabel).toBeTruthy;
  // });

  it('should be called createLabelData', () => {
    const spy = spyOn(component, 'createLabelData').and.callThrough();
    component.appliedCategories = {
      category1: "Red",
      category2: "Yellow color",
      category3: "Red",
      category4: "Green color",
      category5: "Blue",
      category6: "Purple",
    }
    component.labelData = [];
    component.createLabelData();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.createLabelData).toBeTruthy;
  });

  it('should be called toggleLabelEdit', () => {
    const spy = spyOn(component, 'toggleLabelEdit').and.callThrough();

    component.toggleLabelEdit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.toggleLabelEdit).toBeTruthy;
  });
});
