import { async, ComponentFixture, TestBed } from '@angular/core/testing';
declare var microsoftTeams: any;

import { environment } from 'src/environments/environment';
import { SettingsComponent } from './settings.component';
import { of } from 'rxjs';
declare var $: any;
microsoftTeams = {
  initialize() {},
  settings: {
    setValidityState: true,
    setSettings() {},
    registerOnSaveHandler() {
      return of({});
    },
  },
};
fdescribe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let saveEvent={
    notifySuccess(){
      return
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create setting component', () => {
    expect(component).toBeTruthy();
  });

  it('should be called ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    microsoftTeams.initialize();
    component.ngOnInit();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.ngOnInit).toBeTruthy;
  });
  it('should be called saveSettings', () => {
    const spy = spyOn(component, 'saveSettings').and.callThrough();
    microsoftTeams.settings.registerOnSaveHandler(saveEvent);
    component.saveSettings();
    expect(spy).toBeDefined();
    expect(spy).toHaveBeenCalled();
    expect(component.saveSettings).toBeTruthy;
  });
});
