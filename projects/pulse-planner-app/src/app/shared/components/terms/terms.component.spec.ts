import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsComponent } from './terms.component';

fdescribe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create term Component', () => {
    expect(component).toBeTruthy();
  });
});
